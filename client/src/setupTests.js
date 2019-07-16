import { cleanup } from "@testing-library/react";
import * as emotion from "@emotion/core";
import { createSerializer } from "jest-emotion";

global.fetch = require("jest-fetch-mock");

afterEach(cleanup);

beforeEach(() => {
  fetch.resetMocks();
});

expect.addSnapshotSerializer(createSerializer(emotion));
