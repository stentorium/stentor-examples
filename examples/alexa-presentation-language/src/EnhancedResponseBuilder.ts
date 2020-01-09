import { ResponseBuilder } from "@xapp/stentor";
import { EnhancedListItem, Filter } from "./models";

/**
 * Guard to check if the builder is an EnhancedResponseBuilder
 *  
 * @param builder 
 */
export function isEnhancedResponseBuilder(builder: ResponseBuilder): builder is EnhancedResponseBuilder {
    return !!builder && builder instanceof EnhancedResponseBuilder;
}

// Extend the ResponseBuilder so you can add a new builder method.
export class EnhancedResponseBuilder extends ResponseBuilder {
    // Create the new method that takes in the enhanced list item & the current filters
    withFilteredList(items: EnhancedListItem[], filters: Filter[]): EnhancedResponseBuilder {
        if (!Array.isArray(this._response.displays)) {
            this._response.displays = [];
        }

        if (this.device.hasScreen) {
            // Check if we are on Alexa and the device has a screen
            if (this.device.channel === "alexa") {
                // Push an APL template to displays (which will be pulled out later by the translator)
                this._response.displays.push({
                    type: "Alexa.Presentation.APL.RenderDocument",
                    token: "token",
                    version: "1.0",
                    // Add your doc
                    document: {},
                    // Translate your data sources to align with the document
                    datasources: {}
                } as object);
            } else {
                // Or just go the normal list route
                this.withList(items);
            }
        }
        // Return this so we can chain them.
        return this;
    }
}
