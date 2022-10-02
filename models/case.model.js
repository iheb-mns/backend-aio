module.exports = (mongoose) => {
    var schema = mongoose.Schema(
      {
        id: String,
        number: String,
        subject: String,
        notes: String,
        court: String,
        client: String,
        clientOpposent: String,
        lawyer: String,
        lawyerOpposent: String,
        date: String,
        type: String,
        clientAddress: String,
        relatedCases: String,
        room: String,
        fileNumber: String,
        departmentNumber: String,
        status: String,
        userId: String,
        files: Array
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function () {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Case = mongoose.model("case", schema);
    return Case;
  };
  