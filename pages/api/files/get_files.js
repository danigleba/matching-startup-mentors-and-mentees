import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from '@/utils/firebase';


// Function to recursively list all files in a folder and its subfolders
async function listFilesInFolder(folderRef) {
  const fileList = [];

  const listResult = await listAll(folderRef);

  for (const item of listResult.items) {
    // Add the file's download URL to the list
    const downloadURL = await getDownloadURL(item);
    fileList.push({
      name: item.name,
      downloadURL,
    });
  }

  for (const subfolderRef of listResult.prefixes) {
    // Recursively list files in subfolders
    const subfolderFiles = await listFilesInFolder(subfolderRef);
    fileList.push(...subfolderFiles);
  }

  return fileList;
}

// Create a reference to the "student" folder

// Initialize your API route
export default async function handler(req, res) {
  const student_email = req.query.student_email
  const studentFolderRef = ref(storage, `${student_email}`);
  try {
    const fileList = await listFilesInFolder(studentFolderRef);
    res.status(200).json({data: fileList});
  } catch (error) {
    console.error("Error listing files:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
