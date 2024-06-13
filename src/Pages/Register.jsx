import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
import Add from "../assets/addAvatar.png";
import { storage, auth, db } from "../firebase";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const Register = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  function handleChangeFile(event) {
    setFile(event.target.files[0]);
  }


  const handleSubmit = async (e) => {
    setLoading(true);

    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            //create empty user chats on firebase account

            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (error) {
            const errorMessage = error.message;
            // console.log(errorMessage);
            setError("Something went wrong: " + error.message);
            setLoading(false);
          }
        });
      });
    } catch (error) {
      const errorMessage = error.message;
      const errorCode = error.code;
      // console.log(errorMessage, errorCode);
      setError(true);
      setError("Something went wrong: " + error.message);
    }
    setLoading(false)
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Talk</span>
        <span className="title">Register </span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />

          <input style={{ display: "none" }} type="file" id="file" required onChange={handleChangeFile} />
          {file ? (
            <label htmlFor="file">
              <img src={Add} alt="Avatar" />
              <span>Avatar has been uploaded 😎 </span>
            </label>
          ) : (
            <label htmlFor="file">
              <img src={Add} alt="Avatar" />
              <span>Must Add an Avatar 😄</span>
            </label>
          )}

          {/* <label htmlFor="file">
            <img src={Add} alt="Avatar" />
            <span>Must Add an Avatar</span>
          </label> */}

          <button disabled={loading}>
            {loading ? (
              <div className="fetching">
                <Loader />
                <span>Loading...</span>
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
          {/* {loading && "Uploading and compressing the image please wait..."} */}
          {error && <span style={{ color: 'red', fontWeight: 'bold' }}> {error}</span>}
          <p>
            You do have an account? <Link to="/login"  style={{ textDecoration: 'none', color: 'blue' }}>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
