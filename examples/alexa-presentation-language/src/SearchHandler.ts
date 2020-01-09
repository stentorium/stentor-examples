import { AbstractHandler, Context, Request } from "@xapp/stentor";
import { EnhancedResponseBuilder } from "./EnhancedResponseBuilder";

// Define a new context that knows about the EnhancedResponseBuilder
interface EnhancedContext extends Context {
    response: EnhancedResponseBuilder;
}

export class SearchHandler extends AbstractHandler {
    // Then use that interface on the context instead of the base Context
    async handleRequest(request: Request, context: EnhancedContext): Promise<void> {
        // Gain access to the new method, pass in the extra data
        context.response.withFilteredList([], []);

        return super.handleRequest(request, context);
    }

    canHandleRequest(request: Request, context: Context): boolean {
        return true;
    }
}
