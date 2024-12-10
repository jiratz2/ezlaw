import mongoose ,{Schema} from "mongoose";

const folderSchema = new Schema(
    {
        foldername: {type: String, require:true},
        folderdesc: String,
    },
    {
        timestamps:true
    }
);

const Folder = mongoose.models.Folder || mongoose.model('Folder',folderSchema);
export default Folder;