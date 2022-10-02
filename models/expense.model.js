module.exports = (mongoose) => {
    var schema = mongoose.Schema(
      {
        id: String,
        case: String,
        receiver: String,
        giver: String,
        amount: String,
        date: String,
        notes: String,
        userId: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function () {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Expense = mongoose.model("expense", schema);
    return Expense;
  };
  