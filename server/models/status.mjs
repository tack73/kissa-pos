import { Schema, model } from "mongoose";

const statusSchema = new Schema(
    {
        id: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        area: {
            type: String,
            required: true,
        },
        status: {
            type: Number,
            required: true,
            enum : [0,1,2]
        }
    }
);

const Status = model("Status", statusSchema);
export default Status;