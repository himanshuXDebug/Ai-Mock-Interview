import { serial, varchar, text,timestamp,integer } from "drizzle-orm/pg-core";  // Use pg-core for PostgreSQL
import { pgTable } from "drizzle-orm/pg-core";  // Use pgTable for PostgreSQL

export const MockInterview = pgTable('mockInterview', {
  id: serial('id').primaryKey(),
  jsonMockResp: text('jsonMockResp').notNull(),
  jobPosition: varchar('jobPosition', { length: 255 }).notNull(),
  jobDesc: varchar('jobDesc', { length: 255 }).notNull(),
  jobExperience: varchar('jobExperience', { length: 255 }).notNull(),
  createdBy: varchar('createdBy', { length: 255 }).notNull(),
  createdAt: varchar('createdAt', { length: 255 }).notNull(),
  mockId: varchar('mockId', { length: 255 }).notNull(),
});

export const UserAnswer=pgTable('userAnswer',{
  id:serial('id').primaryKey(),
  mockIdRef:varchar('mockId').notNull(),
  question:varchar('question').notNull(),
  correctAns:text('correctAns'),
  userAns:text('userAns'),
  feedback:text('feedback'),
  rating:varchar('rating'), 
  confidenceRating: varchar('confidenceRating'), 
  communicationRating: varchar('communicationRating'),
  skillsRating: varchar('skillsRating'),
  languageRating: varchar('languageRating'),
  userEmail: varchar('userEmail'),
  createdAt: varchar('createdAt')
})



export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  username: text("username").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  likes: integer("likes").default(0),
  views: integer("views").default(0),
  isAnonymous: integer("isAnonymous").default(0),
  likedUsers: text("likedUsers").default("[]"), // Store liked users as an array
});

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  blogId: integer("blogId").notNull(),
  username: text("username").notNull(),
  content: text("content").notNull(),
  parentId: integer("parentId"), // For replies
  createdAt: timestamp("created_at").defaultNow().notNull(),
});