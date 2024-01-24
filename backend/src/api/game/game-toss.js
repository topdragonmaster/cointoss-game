import History from "../../models/history.js";
import User from "../../models/user.js";

const toss = async (req, res) => {
  const { wager, side } = req.body;
  const { userId } = req;
  console.log(req.body, req.userId)

  try {
    const existingUser = await User.findOne({ _id: userId });
    console.log(existingUser)

    if (!existingUser) {
      return res.status(404).json({ message: "User Does Not Exist" });
    }

    const tossResult = Math.random() < 0.5 ? 'Head' : 'Tail';

    // Check if the user's guess matches the toss result
    const isWin = tossResult === side;

    // Update consecutive wins
    if (isWin) {
      if (existingUser.consecutiveWins === 5) {
        existingUser.consecutiveWins = 1;
      } else {
        existingUser.consecutiveWins++;
      }
    } else {
      existingUser.consecutiveWins = 0; // Reset consecutive wins if the user loses
    }

    // Apply bonus payouts
    let payoutMultiplier = 2; // Default multiplier

    if (existingUser.consecutiveWins === 3) {
      payoutMultiplier = 3;
    } else if (existingUser.consecutiveWins === 5) {
      payoutMultiplier = 10;
    }

    existingUser.balance -= wager;
    // Calculate the final payout
    const finalPayout = isWin ? wager * payoutMultiplier : 0;
    existingUser.balance += finalPayout;
    // Subtract the wagered tokens from the user's balance

    // Update the user document in the database
    await existingUser.save();
    await History.create({
      user_id: userId,
      wager,
      isWin,
      finalPayout,
      tossResult,
    });

    // Respond with the result and bonus payout information
    res.json({
      tossResult,
      isWin,
      finalPayout,
      consecutiveWins: existingUser.consecutiveWins,
      balance: existingUser.balance // Include the updated token balance in the response
    });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default toss;