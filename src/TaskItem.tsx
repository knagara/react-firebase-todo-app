import React, { useState } from "react";
import firebase from "firebase/app";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { Grid, TextField, ListItem } from "@material-ui/core";
import { db } from "./firebase";
import styles from "./TaskItem.module.css";

type Props = {
  id: string;
  title: string;
};

const TaskItem = (props: Props) => {
  const [title, setTitle] = useState(props.title);
  const editTask = () => {
    db.collection("tasks").doc(props.id).set({ title: title }, { merge: true });
  };
  const deleteTask = () => {
    db.collection("tasks").doc(props.id).delete();
  };
  return (
    <ListItem>
      <h2>{props.title}</h2>
      <Grid container justifyContent="flex-end">
        <TextField
          label="Edit task"
          value={title}
          onChange={(e: any) => setTitle(e.target.value)}
        />
      </Grid>
      <button className={styles.taskitem__icon} onClick={editTask}>
        <EditOutlinedIcon />
      </button>
      <button className={styles.taskitem__icon} onClick={deleteTask}>
        <DeleteOutlineOutlinedIcon />
      </button>
    </ListItem>
  );
};

export default TaskItem;
