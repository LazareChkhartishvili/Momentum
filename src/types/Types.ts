export type Status = {
  id: number;
  name: string;
};

export type Department = {
  id: number;
  name: string;
};

export type Priority = {
  id: number;
  name: string;
  icon: string;
};

export type Employee = {
  fullName: string;
  id: number;
  name: string;
  surname: string;
  avatar: string;
  department: Department;
};

export type Task = {
  id: number;
  name: string;
  description: string;
  due_date: string;
  department: Department;
  employee: Employee;
  status: Status;
  priority: Priority;
  total_comments: number;
};

export type Comment = {
  id: number;
  text: string;
  task_id: number;
  parent_id: number | null;
  author_avatar: string;
  author_nickname: string;
  sub_comments?: Comment[];
};
