
import { applicationSpec } from "../definitions/app.spec";
import { fragmentSpec } from "../definitions/fragment.spec";
import { fragmentLabelSpec } from "../definitions/fragmentLabel.spec";
import { fragmentVersionSpec } from "../definitions/fragmentVersion.spec";
import { requirementSpec } from "../definitions/requirement.spec";
import { testcaseSpec } from "../definitions/testcase.spec";
import { usecaseSpec } from "../definitions/usecase.spec";
import { SpecDefinition } from "./types/spec.types";

// Import all your spec files here

// Registry object mapping spec names to definitions
const specRegistry: Record<string, SpecDefinition> = {
    application: applicationSpec,
    requirement: requirementSpec,
    usecase: usecaseSpec,
    testcase: testcaseSpec,
    fragment: fragmentSpec,
    fragmentVersion: fragmentVersionSpec,
    fragmentLabel: fragmentLabelSpec,
};

// Export a function to get spec by domain name
export const getSpecByName = (name: string): SpecDefinition | undefined => {
    return specRegistry[name];
};

// Optional: List of all available domains
export const listAllSpecs = (): string[] => Object.keys(specRegistry);
