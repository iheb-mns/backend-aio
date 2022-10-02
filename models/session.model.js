module.exports = (mongoose) => {
    var schema = mongoose.Schema(
      {
        id: String,
        number: String,
        case: String,
        client: String,
        date: String,
        department: String,
        roll: String,
        reason: String,
        demands: String,
        lawyer: String,
        decision: String,
        dateNext: String,
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
  
    const Session = mongoose.model("session", schema);
    return Session;
  };
  