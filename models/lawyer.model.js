module.exports = (mongoose) => {
    var schema = mongoose.Schema(
        {
            id: String,
            name: String,
            number: String,
            authNumber: String,
            address: String,
            mobile: String,
            phone: String,
            idCard: String,
            email: String,
            notes: String,
            office: String,
            userId: String
        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Lawyer  = mongoose.model("lawyer ", schema);
    return Lawyer ;
};
