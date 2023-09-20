import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { ZodError, z } from "zod";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import ms from "ms";
import { customResponse } from "../../../utils/Response";
import { Configuration, OpenAIApi } from "openai";

const prisma = new PrismaClient();
const config = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(config);
const virtualMentor = {
  async openAianswer(req, res, next) {
    try {
      const { prompt } = req.body;
      const completion = await openai.createCompletion({
        prompt: prompt,
        max_tokens: 50, // Adjust this according to your needs
      });

      const answer = completion.choices[0].text;

      // Send the answer in the HTTP response
      customResponse(res, 200, { answer: answer });
    } catch (error) {
      next(error);
    }
  },
};
export default virtualMentor;
