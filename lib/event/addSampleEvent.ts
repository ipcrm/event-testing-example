import {configurationValue, GraphQL, HttpClient, logger, OnEvent, Success} from "@atomist/automation-client";
import {EventHandlerRegistration, SoftwareDeliveryMachineConfiguration} from "@atomist/sdm";
import {OnSampleEvent} from "../typings/types";

export const onSampleEventHandler: OnEvent<OnSampleEvent.Subscription> = async (e, ctx) => {
  const config = configurationValue<SoftwareDeliveryMachineConfiguration>();
  const url = "https://icanhazdadjoke.com/";
  const httpClient: HttpClient = config.http.client.factory.create(url);
  const joke = await httpClient.exchange<{joke: string}>(url, {headers: {["accept"]: "application/json"}});

 // "Accept: application/json" https://icanhazdadjoke.com/
  logger.info(
    "Sample Event " + e.data.SampleEvent[0].message +
      " Sample timestamp" + e.data.SampleEvent[0].timestamp +
      " Joke? " + joke.body.joke + "\n",
  );
  return Success;
};

export const onSampleEvent: EventHandlerRegistration<OnSampleEvent.Subscription> = {
  name: "onSampleEvent",
  subscription: GraphQL.subscription("OnSampleEvent"),
  listener: onSampleEventHandler,
};
