import "dotenv/config";

import mongoose from "mongoose";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

const seedUsers = [
  ["seed_alex_chen", "Alex Chen", "alex.chen@example.com", "https://i.pravatar.cc/150?img=1"],
  ["seed_sam_taylor", "Sam Taylor", "sam.taylor@example.com", "https://i.pravatar.cc/150?img=2"],
  ["seed_jordan_lee", "Jordan Lee", "jordan.lee@example.com", "https://i.pravatar.cc/150?img=3"],
  ["seed_riley_kim", "Riley Kim", "riley.kim@example.com", "https://i.pravatar.cc/150?img=6"],
  [
    "seed_harper_lane",
    "Harper Lane",
    "harper.lane@example.com",
    "https://i.pravatar.cc/150?img=14",
  ],
  [
    "seed_charlie_bennett",
    "Charlie Bennett",
    "charlie.bennett@example.com",
    "https://i.pravatar.cc/150?img=15",
  ],
  [
    "seed_rowan_blake",
    "Rowan Blake",
    "rowan.blake@example.com",
    "https://i.pravatar.cc/150?img=18",
  ],
];

async function seedDatabase() {
  await connectDB();

  const result = await User.bulkWrite(
    seedUsers.map(([clerkId, fullName, email, profilePic]) => ({
      updateOne: {
        filter: { clerkId },
        update: {
          $set: { clerkId, fullName, email, profilePic },
        },
        upsert: true,
      },
    })),
  );

  console.log(
    `Seeded users. Inserted: ${result.upsertedCount}, updated: ${result.modifiedCount}, matched: ${result.matchedCount}`,
  );
}

seedDatabase()
  .catch((error) => {
    console.error("Failed to seed users:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });