// src/pages/Home.tsx
//import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <main className="container">
      <h1 className="heading">Welcome to Our Dev & Creator Hub</h1>

      <section className="section">
        <h2 className="section-heading">About Us</h2>
        <p>
          <strong>Muizz</strong> and <strong>Wali</strong> are the creators behind this site.
          <br />
          We are brothers who created this app for our selves and testing.
        </p>
      </section>

      <section className="section">
        <h2 className="section-heading">Muizz</h2>
        <ul className="list">
          <li className="list-item">GitHub: <a href="https://github.com/scp-ss" target="_blank" rel="noreferrer" className="link">scp-ss</a></li>
          <li className="list-item">Google Play Console ID: 6016710798159463515</li>
          <li className="list-item">YouTube Channel: <a href="https://www.youtube.com/@asmEnjoyer" target="_blank" rel="noreferrer" className="link">@asmEnjoyer</a></li>
          <li className="list-item role">Role: Testing programming skills, uploading privacy policies for apps/games, and promoting game development projects.</li>
        </ul>
      </section>

      <section className="section">
        <h2 className="section-heading">Wali</h2>
        <ul className="list">
          <li className="list-item">YouTube Channel: <a href="https://www.youtube.com/@walyxae" target="_blank" rel="noreferrer" className="link">@walyxae</a></li>
          <li className="list-item role">Role: Promoting his videos and content.</li>
        </ul>
      </section>

      <section className="section">
        <h2 className="section-heading">Why We Created This</h2>
        <p>
          Muizz created this site to test his programming skills, upload privacy policies for his apps and games, and promote his game development projects.
          <br />
          Wali created it to promote his videos and grow his audience.
        </p>
      </section>
    </main>
  );
};

export default Home;
