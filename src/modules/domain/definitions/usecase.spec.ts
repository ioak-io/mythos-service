import { SpecDefinition } from "../specs/types/spec.types";

export const usecaseSpec: SpecDefinition = {
  fields:{
    reference: {
      type: "string"
    },
    requirement: {
      type: "string",
      required: true,
      parent: {
        domain: "requirement",
        field: "reference"
      },
      displayOptions:{
        type: "autocomplete",
        label: "Requirement",
      }
    },
    title:{
      type: "string",
      required: true,
      displayOptions:{
        type: "text",
        label: "Title",
        placeholder: "Usecase Title"
      }
    },
    description: {
      type: "string",
      required: true,
      displayOptions:{
        type: "text",
        label: "Usecase",
        placeholder: "Usecase Description"
      }
    }
  },
  meta:{
    children: [
      {
        domain: "testcase",
        field: {
          parent: "reference",
          child: "usecase"
        },
        cascadeDelete: true
      }
    ]
  }
};
