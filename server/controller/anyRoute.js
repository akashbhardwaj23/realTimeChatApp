import { ExpressAuth } from "@auth/express";
import google from "@auth/express/providers/google";
import GoogleProvider from "@auth/express/providers/google";
import express from "express";

const router = express.Router();

router.use(
  "/auth/*",
  ExpressAuth({
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    ],
    secret: process.env.AUTH_SECRET,
    session: {
        strategy:"jwt",
        maxAge: 30*24*60*60, // 30 days
    }, // 30 days
    callbacks:"http://localhost:3000/auth/callback/[provider]"
  },
  
  
),

);
