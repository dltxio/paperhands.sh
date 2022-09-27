import * as React from "react";
import "./App.css";
import { TerminalContextProvider } from "react-terminal";
import { ReactTerminal } from "react-terminal";
import { ethers } from "ethers";

const App = () => {
  const [theme, setTheme] = React.useState("matrix");
  const [prompt, setPrompt] = React.useState(">>>");
  const [address, setAddress] = React.useState("");

  const commands = {
    help: (
      <span>
        <strong>clear</strong> - clears the console. <br />
        <strong>change_theme &lt;THEME&gt;</strong> - Changes the theme of the
        terminal. Allowed themes - light, dark, material-light, material-dark,
        material-ocean, matrix and dracula. <br />
        <strong>connect - connects your Metamask wallet</strong>
        <strong>price [SYMBOL]</strong> - gets the price of the token in USD <br />
        <strong>price [SYMBOL] [FIAT]</strong> - gets the price of the token in that pair <br />
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
        "dracula"
      ];
      if (!validThemes.includes(theme)) {
        return `Theme ${theme} not valid. Try one of ${validThemes.join(", ")}`;
      }
      setTheme(theme);
    },

    price: async (symbol) => {
      const response = await fetch(`${process.env.REACT_APP_API}/price/${symbol}`);
      return await response.text();
    },

    connect: () => {
      // Asking if metamask is already present or not
      if (window.ethereum) {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((res) => {
            console.log(res);
            // setdata({ ...data, address: res[0] });
            setAddress(res[0]);
            setPrompt(`Connected to ${res[0]} >>>`);
          });
      } else {
        alert("install metamask extension!!");
      }
    },

    balance: async (args) => {
      console.log(args);
      const _address = args || address;

      const response = await fetch(`${process.env.REACT_APP_API}/balance/${_address}`);
      return await response.text();
    },

    swap: async (args) => {
      const [amount, source_token, destination_token] = args.split(" ");
      const response = await fetch(`${process.env.REACT_APP_API}/swap/${source_token}&destination=${destination_token}?amount=${amount}`);
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
};

export default App;
