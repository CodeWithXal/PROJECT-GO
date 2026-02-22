import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CompleteProfile() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "http://localhost:3000/api/user/complete-profile",
        {
          username,
          bio,
          skills: skills.split(",").map((s) => s.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Complete Your Profile</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <textarea
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Skills (comma separated)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>

        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}

export default CompleteProfile;