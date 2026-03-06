import type { Activity, ActivityType, Goal, ActivityWithId } from "./interface";
import axios from "axios";

const API_URL_GOAL = "http://localhost:3000/api/goals/1";
const API_URL_ACTIVITY = "http://localhost:3000/api/activities";
const API_URL_ACTIVITY_TYPES = "http://localhost:3000/api/activity-types";

export const fetchGoal = async (): Promise<Goal> => {
  const response = await axios.get(API_URL_GOAL);
  return response.data;
};

// obtener actividades
export const fetchActivities = async (): Promise<ActivityWithId[]> => {
  const response = await axios.get(API_URL_ACTIVITY);
  return response.data;
};

// obtener una actividad por id
export const fetchActivityById = async (id_activity: number): Promise<Activity> => {
  const response = await axios.get(`${API_URL_ACTIVITY}/${id_activity}`);
  return response.data;
};

// crear una actividad
export const createActivity = async (activity: Activity): Promise<Activity> => {
  const response = await axios.post(API_URL_ACTIVITY, activity);
  return response.data;
};

// eliminar una actividad
export const deleteActivity = async (id_activity: number): Promise<ActivityWithId> => {
  const response = await axios.delete(`${API_URL_ACTIVITY}/${id_activity}`);
  return response.data;
};

// actualizar una actividad
export const updateActivity = async (activity: ActivityWithId): Promise<Activity> => {
  const response = await axios.put(`${API_URL_ACTIVITY}/${activity.id_activity}`, activity);
  return response.data;
};

// obtener tipos de actividades
export const fetchActivityTypes = async (): Promise<ActivityType[]> => {
  const response = await axios.get(API_URL_ACTIVITY_TYPES);
  return response.data;
};