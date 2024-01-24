import History from "../../models/history.js";

const getHistory = async (req, res) => {
  const { userId } = req
  try {
    const history = await History.find({user_id: userId})
      .sort({ createdAt: -1 })
      .limit(10)
      .exec();

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default getHistory;