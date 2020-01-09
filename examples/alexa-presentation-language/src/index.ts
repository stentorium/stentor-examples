require("dotenv").config();

import { Assistant, Channel } from "@xapp/stentor";
import { Alexa } from "@xapp/stentor-alexa";
import { Dialogflow } from "@xapp/stentor-dialogflow";
import { DynamoUserStorageService } from "@xapp/stentor-service-user-storage";
import { EnhancedResponseBuilder } from "./EnhancedResponseBuilder";
import { SearchHandler } from "./SearchHandler";

// We want to wrap each of the channels to upgrade the response builder with our custom one.
function Upgrade(channel: Channel): Channel {
    channel.builder = EnhancedResponseBuilder;
    return channel;
}

export const handler: any = new Assistant()
    .withUserStorage(
        new DynamoUserStorageService({
            appId: process.env.OVAI_APP_ID,
            tableName: "stentor-user-prod"
        })
    )
    .withHandlers({
        SearchHandler
    })
    // When providing the channels, wrap them
    .withChannels([Upgrade(Alexa()), Upgrade(Dialogflow())])
    .lambda();
