const axios = require("axios");
// const ONEAUTH_API = process.env.ONEAUTH_API || "http://localhost:4010/api";
const ONEAUTH_API = process.env.ONEAUTH_API || "https://api.ioak.io:8010/api";
import { getGlobalCollection } from "../../../lib/dbutils";
import {
  assessmentResponseheaderCollection,
  assessmentResponseheaderSchema,
} from "./model";
import { getAssessmentQuestion } from "../question/helper";
import { importQuestions, getNextQuestion } from "../responsedetail/helper";
const { getCollection } = require("../../../lib/dbutils");
import * as Gptutils from "../../../lib/gptutils";

export const updateAssessmentResponseheader = async (
  id: string,
  questionId: string,
  data: any,
  userId: string
) => {
  const model = getGlobalCollection(
    assessmentResponseheaderCollection,
    assessmentResponseheaderSchema
  );
  const _payload: any[] = [];
  _payload.push({
    updateOne: {
      filter: {
        // _id: item._id,
        assessmentId: id,
        _id: questionId,
      },
      update: {
        ...data,
      },
      upsert: true,
    },
  });
  return await model.bulkWrite(_payload);
};

export const getAssessmentResponseheader = async (id: string) => {
  const model = getGlobalCollection(
    assessmentResponseheaderCollection,
    assessmentResponseheaderSchema
  );

  return await model.find({ assessmentId: id });
};

export const getAssessmentResponseheaderById = async (responseId: string) => {
  const model = getGlobalCollection(
    assessmentResponseheaderCollection,
    assessmentResponseheaderSchema
  );

  return await model.findOne({ _id: responseId });
};

export const reloadAssessmentResponse = async (
  id: string,
  responseId: string
) => {
  const model = getGlobalCollection(
    assessmentResponseheaderCollection,
    assessmentResponseheaderSchema
  );

  const responseHeader = await model.findOne({
    assessmentId: id,
    _id: responseId,
  });

  // return await model.find({ assessmentId: id, _id: responseId });
  const nextQuestion = await getNextQuestion(responseId);

  if (nextQuestion) {
    return {
      hasSubmitted: false,
      question: {
        questionId: nextQuestion.question._id,
        question: nextQuestion.question.data.question,
        choices: nextQuestion.question.data.choices,
        type: nextQuestion.question.type,
      },
      responseId,
      referenceId: nextQuestion._id,
      currentQuestionNumber: responseHeader.answered + 1,
      totalQuestions: responseHeader.totalQuestions,
    };
  }

  return {
    hasSubmitted: true,
    responseId,
    totalQuestions: responseHeader.totalQuestions,
  };
};

export const createAssessmentResponseheader = async (id: string, data: any) => {
  const model = getGlobalCollection(
    assessmentResponseheaderCollection,
    assessmentResponseheaderSchema
  );

  const existingresponseHeader = await model.find({
    assessmentId: id,
    email: data.email,
  });
  let responseHeader = null;
  if (existingresponseHeader.length === 0) {
    const questions = await getAssessmentQuestion(id);
    responseHeader = await model.create({
      assessmentId: id,
      ...data,
      totalQuestions: questions.length,
      answered: 0,
      score: 0,
    });
    await importQuestions(responseHeader._id, questions);
  } else {
    responseHeader = existingresponseHeader[0];
  }

  const responseId = responseHeader._id;

  if (responseHeader.hasSubmitted) {
    return {
      hasSubmitted: true,
      responseId,
      totalQuestions: responseHeader.totalQuestions,
    };
  }

  const nextQuestion = await getNextQuestion(responseId);

  if (nextQuestion) {
    return {
      hasSubmitted: false,
      question: {
        questionId: nextQuestion.question._id,
        question: nextQuestion.question.data.question,
        choices: nextQuestion.question.data.choices,
        type: nextQuestion.question.type,
      },
      responseId,
      referenceId: nextQuestion._id,
      currentQuestionNumber: responseHeader.answered + 1,
      totalQuestions: responseHeader.totalQuestions,
    };
  }

  return {
    hasSubmitted: true,
    responseId,
    totalQuestions: responseHeader.totalQuestions,
  };
};

export const deleteAssessmentResponseheader = async (
  id: string,
  questionId: string
) => {
  const model = getGlobalCollection(
    assessmentResponseheaderCollection,
    assessmentResponseheaderSchema
  );
  return await model.deleteMany({ _id: questionId, assessmentId: id });
};

export const updateScore = async (responseId: string, score: number) => {
  const model = getGlobalCollection(
    assessmentResponseheaderCollection,
    assessmentResponseheaderSchema
  );

  await model.updateOne({ _id: responseId }, { $inc: { score, answered: 1 } });
};

export const finalizeResponse = async (responseId: string) => {
  const model = getGlobalCollection(
    assessmentResponseheaderCollection,
    assessmentResponseheaderSchema
  );

  await model.updateOne({ _id: responseId }, { isSubmitted: true });
};

export const getResponseHeaderById = async (responseId: string) => {
  const model = getGlobalCollection(
    assessmentResponseheaderCollection,
    assessmentResponseheaderSchema
  );

  return await model.findOne({ _id: responseId });
};
