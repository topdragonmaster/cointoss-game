import History from "../../models/history.js";

const getLeaderBoard = async (req, res) => {
  try {
    const history = await History.aggregate([
      {
        $group: {
          _id: '$user_id',
          totalWagers: { $sum: '$wager' },
        },
      },
      {
        $lookup: {
          from: 'users', // name of the 'User' collection
          localField: '_id',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      {
        $unwind: '$userDetails',
      }
   ])

    res.json(history);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default getLeaderBoard;