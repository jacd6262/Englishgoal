export interface Goal {
  id_goal: number;
  id_user: number;
  target_minutes: number;
  remaining_minutes: number;
}

export interface Activity {
  id_user: number;
  id_goal: number;
  id_activity_type: number;
  activity_name: string;
  observation: string;
  minutes_spent: number;
  date_activity: string;
  time_activity: string;
}

export interface ActivityWithId extends Activity {
  id_activity: number;
}

export interface ActivityType {
  id_activity_type: number
  name: string
  description: string
}