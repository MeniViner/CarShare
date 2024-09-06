// import React, { useEffect, useState } from 'react';
// import { uploadCarsToFirebase } from './uploadCarsData';

// const UploadCars = () => {
//   const [isUploaded, setIsUploaded] = useState(false);

//   useEffect(() => {
//     const upload = async () => {
//       await uploadCarsToFirebase();
//       setIsUploaded(true);
//     };
//     upload();
//   }, []);

//   return (
//     <div>
//       {isUploaded ? 'Cars uploaded successfully!' : 'Uploading cars...'}
//     </div>
//   );
// };

// export default UploadCars;