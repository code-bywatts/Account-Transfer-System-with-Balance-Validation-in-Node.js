import Account from "../models/Account.js";

export const transferFunds = async (req, res) => {
  const { fromAccount, toAccount, amount } = req.body;

  if (!fromAccount || !toAccount || !amount) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const sender = await Account.findOne({ name: fromAccount });
    const receiver = await Account.findOne({ name: toAccount });

    if (!sender || !receiver) {
      return res.status(404).json({ message: "Account not found." });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance." });
    }

    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save();
    await receiver.save();

    res.json({ message: `Transfer of ₹${amount} from ${fromAccount} to ${toAccount} successful.` });
  } catch (error) {
    res.status(500).json({ message: "Transaction failed.", error });
  }
};
