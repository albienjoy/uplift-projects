import {Link} from "react-router";

export const LandingPage = () => {

    return (
        <>
        <div>Albien Sison</div>
        <div>I am a full-stack developer. I am a content editor.</div>
        <div>I need a job. Hire me</div>

        <div>Click here for the Albien treatment</div>

        <Link to="/home">
        <button>Albienify</button>
        </Link>




    <div className="font-sans text-gray-800 scroll-smooth">
      {/* NAVBAR */}
      <nav className="fixed w-full bg-white shadow-md z-10">
        <div className="max-w-6xl mx-auto flex justify-between p-4">
          <h1 className="font-bold">AJS</h1>
          <div className="space-x-4">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section
        id="about"
        className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20"
      >
        <img
          src="https://via.placeholder.com/150"
          alt="Albien Joy Sison profile"
          className="rounded-full mb-4 w-32 h-32 object-cover"
        />
        <h1 className="text-4xl font-bold mb-2">
          Albien Joy Sison
        </h1>
        <p className="text-lg max-w-xl mb-4">
          I’m a content editor transitioning into a full-stack developer,
          bringing strong communication, problem-solving, and analytical
          thinking into building modern web applications.
        </p>
        <p className="text-gray-600 max-w-xl">
          I specialize in the MERN stack and enjoy debugging complex problems,
          writing clean code, and continuously learning new technologies.
        </p>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-6">Skills</h2>

        <a
          href="/resume.pdf"
          download
          className="inline-flex items-center gap-2 mb-8 bg-blue-600 text-white px-4 py-2 rounded"
        >
          {/* <FaDownload /> Download Resume */}
        </a>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={skill.icon}
                alt={skill.name}
                className="w-12 h-12 mb-2"
              />
              <p>{skill.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Projects</h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
          {projects.map((project, index) => (
            <div key={index} className="shadow-md rounded p-4">
              <img
                src={project.image}
                alt={`${project.name} preview`}
                className="mb-4 w-full h-40 object-cover"
              />
              <h3 className="font-semibold mb-2">{project.name}</h3>

              <div className="flex justify-center gap-4">
                <a href={project.repo} target="_blank" rel="noreferrer">
                  {/* <FaGithub /> */}
                </a>
                <a href={project.live} target="_blank" rel="noreferrer">
                  {/* <FaExternalLinkAlt /> */}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-4">Contact</h2>

        <p className="mb-4">
          Let’s connect or collaborate on something meaningful.
        </p>

        <div className="flex justify-center gap-6 text-xl">
          <a href="mailto:your-email@example.com">
            Email
          </a>

          <a
            href="https://github.com/albienjoy"
            target="_blank"
            rel="noreferrer"
          >
            {/* <FaGithub /> */}
          </a>

          <a
            href="https://www.linkedin.com/in/albien-joy-sison-8ba94a92/"
            target="_blank"
            rel="noreferrer"
          >
            {/* <FaLinkedin /> */}
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Albien Joy Sison
      </footer>
    </div>
        </>
    );
};
