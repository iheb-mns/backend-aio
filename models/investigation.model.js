module.exports = (mongoose) => {
    var schema = mongoose.Schema(
      {
        id: String,
        number: String,
        report: String,
        area: String,
        date: String,
        client: String,
        clientOther: String,
        clientOpposent: String,
        clientOpposentOther: String,
        clientDescription: String,
        clientOpposentDescription: String,
        subject: String,
        decision: String,
        lawyer: String,
        dateClose: String,
        userId: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function () {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Investigation = mongoose.model("investigation", schema);
    return Investigation;
  };
  