export default function HomePage() {
  return (
    <main className="max-w-3xl mx-auto space-y-10">
      <h1 className="main-heading">Welcome to Our Dev & Creator Hub</h1>

      <section className="card">
        <h2 className="section-title">About Us</h2>
        <p>
          <strong>Muizz</strong> and <strong>Wali</strong> are the creators behind this site.
          <br />
          We are brothers who created this app for ourselves and testing.
        </p>
      </section>

      <section className="card">
        <h2 className="section-title">Muizz</h2>
        <ul className="list-none mt-3 space-y-2">
          <li>
            GitHub:{" "}
            <a
              href="https://github.com/scp-ss"
              className="link"
              target="_blank"
              rel="noreferrer"
            >
              scp-ss
            </a>
          </li>
          <li>Google Play Console ID: 6016710798159463515</li>
          <li>
            YouTube Channel:{" "}
            <a
              href="https://www.youtube.com/@asmEnjoyer"
              className="link"
              target="_blank"
              rel="noreferrer"
            >
              @asmEnjoyer
            </a>
          </li>
          <li className="italic">
            Role: Testing programming skills, uploading privacy policies for apps/games, and
            promoting game development projects.
          </li>
        </ul>
      </section>

      <section className="card">
        <h2 className="section-title">Wali</h2>
        <ul className="list-none mt-3 space-y-2">
          <li>
            YouTube Channel:{" "}
            <a
              href="https://www.youtube.com/@walyxae"
              className="link"
              target="_blank"
              rel="noreferrer"
            >
              @walyxae
            </a>
          </li>
          <li className="italic">Role: Promoting his videos and content.</li>
        </ul>
      </section>

      <section className="card">
        <h2 className="section-title">Why We Created This</h2>
        <p>
          Muizz created this site to test his programming skills, upload privacy policies for his
          apps and games, and promote his game development projects.
          <br />
          Wali created it to promote his videos and grow his audience.
        </p>
      </section>
    </main>
  );
}
