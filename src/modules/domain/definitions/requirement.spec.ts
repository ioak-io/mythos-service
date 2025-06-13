import { SpecDefinition } from "../specs/types/spec.types";

export const requirementSpec: SpecDefinition = {
  fields: {
    reference: {
      type: "string",
    },
    application: {
      type: "string",
      required: true,
      parent: {
        domain: "application",
        field: "reference"
      },
      displayOptions: {
        type: "autocomplete",
        label: "Application",
      }
    },
    description: {
      type: "string",
      required: true,
      displayOptions: {
        type: "text",
        label: "Description",
        placeholder: "Requirement Description"
      }
    }
  },
  meta: {
    children: [
      {
        domain: "usecase",
        field: {
          parent: "reference",
          child: "requirement"
        },
        cascadeDelete: true
      }
    ]
  }
};
