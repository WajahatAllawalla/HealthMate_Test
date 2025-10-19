import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router";
import verifiedImg from "./../../assets/images/verified.gif";
import verificationFailedImg from "./../../assets/images/verification-failed.gif";

const EmailVerification = () => {
  const { token } = useParams();
  const [isVerified, setIsVerified] = useState(null);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/auth/verify-email/${token}`);
        if (data.success) {
          setIsVerified(true);
        } else {
          setIsVerified(false);
        }
      } catch (error) {
        console.error("Verification error:", error);
        setIsVerified(false);
      }
    };

    verifyEmail();
  }, [token]);

  if (isVerified === null) {
    return <h1 className="text-center mt-10">Verifying your email...</h1>;
  }

  return (
    <div className="">
      {isVerified ? (
        <div className="text-center">
          <img src={verifiedImg} alt="Verified" className="w-[120px] mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-blue-600 mb-4">Email Verified Successfully!</h1>
          <Link to="/signin" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
            Go to Sign In
          </Link>
        </div>
      ) : (
        <div>
          <img src={verificationFailedImg} alt="Failed" className="w-[120px] mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-red-600 mb-4">Email Verification Failed!</h1>
          <Link to="/" className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition">
            Go Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default EmailVerification;