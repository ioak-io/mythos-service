import { SpecDefinition } from "../specs/types/spec.types";

export const testcaseSpec: SpecDefinition = {
  fields:{
    applicationId: {
      type: "string",
      required: true,
    },
    requirementId: {
        type: "string",
        required: true
    },
    usecaseId: {
        type: "string",
        required: true
    },
    description:{
      type: "object",
      required: true,
      fields:{
        overview: {
          type: "string",
          required: true,
        },
        steps: {
          type: "array",
          required: true,
          itemType: 'string',
          displayOptions:{
            label: "Steps",
            placeholder: "Enter steps here"
          }
        },
        expectedOutcome: {
          type: "string",
          required: true,
        },
      }
    },
    summary: {
      type: "string",
      required: true,
    },
    priority:{
      type: "string",
      required: true,
    },
    comments:{
      type: "string",
      required: true,
    },
    components:{
      type: "string",
      required: true,
    },
    label:{
      type: "string",
      required: true,
    }
  }
};
