interface GlobalVariables {
  readonly API_URL: string;
}

interface Config {
  readonly development: GlobalVariables;
  readonly production: GlobalVariables;
  readonly test: GlobalVariables;
}

const config: Config = {
  development: {
    API_URL: "http://localhost:8000/api",
  },
  production: {
    API_URL: "http://localhost:8000/api",
  },
  test: {
    API_URL: "",
  },
};

const env = process.env.NODE_ENV || "development";

export default config[env];
