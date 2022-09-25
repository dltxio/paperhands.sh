import * as React from "react";
import "./App.css";
import { TerminalContextProvider } from "react-terminal";
import { ReactTerminal } from "react-terminal";

const App = () => {
  const [theme, setTheme] = React.useState("matrix");
  const [prompt, setPrompt] = React.useState(">>>");

  const commands = {
    help: (
      <span>
        <strong>clear</strong> - clears the console. <br />
        <strong>change_theme &lt;THEME&gt;</strong> - Changes the theme of the
        terminal. Allowed themes - light, dark, material-light, material-dark,
        material-ocean, matrix and dracula. <br />
      </span>
    ),

    change_prompt: (prompt) => {
      setPrompt(prompt);
    },

    change_theme: (theme) => {
      const validThemes = [
        "light",
        "dark",
        "material-light",
        "material-dark",
        "material-ocean",
        "matrix",
        "dracula",
      ];
      if (!validThemes.includes(theme)) {
        return `Theme ${theme} not valid. Try one of ${validThemes.join(", ")}`;
      }
      setTheme(theme);
    },

    // evaluate_math_expression: async (expr) => {
    //   const response = await fetch(
    //     `https://api.mathjs.org/v4/?expr=${encodeURIComponent(expr)}`
    //   );
    //   return await response.text();
    // },

    command: async (command) => {
      const response = await fetch(
        `http://localhost:3003/expr=${encodeURIComponent(command)}`
      );
      return await response.text();
    },

    bitcoin: async () => {
      const response = await fetch(
        `http://localhost:3003/bitcoin`
      );
      return await response.text();
    },
  };

  const welcomeMessage = (
    <span>
      Welcome to paperhands.sh. Type "help" for all available commands. <br />
    </span>
  );

  return (
    <div className="App">
      <TerminalContextProvider>
        <ReactTerminal
          prompt={prompt}
          theme={theme}
          showControlBar={true}
          showControlButtons={true}
          welcomeMessage={welcomeMessage}
          commands={commands}
        />
      </TerminalContextProvider>
    </div>
  );
}

export default App;
