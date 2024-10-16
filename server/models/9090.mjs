import { Schema, model } from "mongoose";

const statusSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        time:{
            type: Date,
            required: true
        },
        type:{
            type: String,
            required: true
        },
        rotationTimes:{
            type: Number,
            required: true
        }
    }
);

const Status9090 = model("Status9090", statusSchema);
export default Status9090;