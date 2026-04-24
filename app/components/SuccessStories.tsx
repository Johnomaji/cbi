import { getMilestones } from "@/lib/data";
import SuccessStoriesClient from "./SuccessStoriesClient";

export default async function SuccessStories() {
  const milestones = (await getMilestones()).sort((a, b) => a.order - b.order);
  return <SuccessStoriesClient milestones={milestones} />;
}
