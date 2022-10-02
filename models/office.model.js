module.exports = (mongoose) => {
    var schema = mongoose.Schema(
      {
        id: String,
        number: String,
        name: String,
        address: String,
        persons: String,
        email: String,
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
  
    const Office = mongoose.model("office", schema);
    return Office;
  };
  