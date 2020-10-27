/*
 * Copyright © 2019 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as autoClient from "@atomist/automation-client";
import {fakeContext} from "@atomist/sdm";
import * as assert from "power-assert";
import * as sinon from "sinon";
import {onSampleEventHandler} from "../lib/event/addSampleEvent";
import {FakeHttpClient, FakeHttpClientFactory} from "./utils/FakeHttpClients";

describe("onSampleEvent", () => {
  let sandbox: sinon.SinonSandbox;
  before(() => {
      sandbox = sinon.createSandbox();
  });
  after(() => {
      sandbox.reset();
      sandbox.restore();
  });
  it("does not throw", async () => {
    // Create a stub for configurationValue that returns a fake http client and set a spy on the client exchange function
    const c = sandbox.stub(autoClient, "configurationValue");
    const fakeConfig = { http: { client: { factory: new FakeHttpClientFactory() }}};
    c.returns(fakeConfig);
    const d = sandbox.spy(FakeHttpClient.prototype, "exchange");
    const data = JSON.parse(
      '{"data":{"SampleEvent":[{"message":"My new event from [object Object]","timestamp":"1603807799336"}]},"extensions":{"operationName":"onSampleEvent","query_id":"1cad9a23-f861-43f5-a32b-8ec82dc7040d","team_id":"A2MO4H2RG","team_name":null,"correlation_id":"88d3e0aa-2c76-4fcd-a4e6- 810500a64ca5"}}');
    await onSampleEventHandler(data, fakeContext(), undefined);
    c.restore();
    d.restore();

    assert(d.called);
  });
});
