import {useParams} from 'react-router-dom'

export default function FolderPage() {
  const param =  useParams(); // This hook returns an object of key-value pairs
  //OR
//   const {folderName } = useParams()
  const folderName = param.folderName;
  return (
    <>
      hello {folderName}
    </>
  )
}
