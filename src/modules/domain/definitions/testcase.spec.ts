import { SpecDefinition } from "../specs/types/spec.types";

export const testcaseSpec: SpecDefinition = {
  fields:{
    reference: {
      type: "string"
    },
    usecase: {
      type: "string",
      required: true,
      parent: {
        domain: "usecase",
        field: "reference"
      },
      displayOptions:{
        type: "autocomplete",
        label: "Usecase",
      }
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
    },
    label:{
      type: "string",
    }
  }
};
