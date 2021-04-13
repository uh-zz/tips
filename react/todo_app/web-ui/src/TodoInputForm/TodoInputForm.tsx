import React from 'react';
import { useState } from 'react';
import style from './TodoInputForm.module.css';
import classNames from 'classnames'
import { Button,  FormControl,  Input,  ListItemText,  makeStyles, MenuItem, Select, TextareaAutosize, TextField } from '@material-ui/core'
// export class TodoInputForm extends React.Component{}
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import { ThemeProvider } from '@material-ui/styles';
import { callbackify } from 'node:util';

const theme = createMuiTheme({
    palette: {
      primary: {
          // light: will be calculated from palette.primary.main,
          main: '#000164',
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        light: '#0066ff',
        main: '#0044ff',
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#ffcc00',
      },
      // Used by `getContrastText()` to maximize the contrast between
      // the background and the text.
      contrastThreshold: 3,
      // Used by the functions below to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2,
    },
    typography: {
        // In Chinese and Japanese the characters are usually larger,
        // so a smaller fontsize may be appropriate.
        fontSize: 16,
    },
});
const useStyles = makeStyles({
    input: {
        width:"300px",
        "& .MuiInputBase-root": {
            background: "#fff",
            border:"#090A0B 2px solid",
            color:"#090A0B",
        },
        // "& .MuiInputBase-root:hover": {
        //     background:"#000",
        //     opacity:0.1,
        // }
    },
    select:{
        width:300,
        "& .MuiSelect-root": {
            background: "#fff",
            border:"#090A0B 2px solid",
            borderRadius:"4px 4px 0px 0px",
            color:"#090A0B",
        },
    }
});
/**
 * @funcdesc 列のサイズを計算する
*/
const calcTextAreaRows = (text:string,cols:number) => {
    return Math.max(Math.floor( text.length / cols ) + 1,3)
}

export const TodoInputForm = () => {
    const [title,setTitle] = useState<string>("")
    const classes = useStyles();
    const [detail,setDetail] = useState<string>("");
    const [category,setCategory] = useState<string>("");

    return (
        <ThemeProvider theme={theme}>
            <div className={style.TodoInputForm} >
                <h1 className={classNames(style.TodoInputFormHeader ,'big-bold-font')} >
                    Create New Todo!
                </h1>
                <div className={classNames(style.Forms,'semibig-font')}>
                    <div className={classNames(style.Form)}>
                        <TextField
                            required 
                            id="filled-basic" 
                            variant="filled"
                            label="Title" 
                            value={title}
                            color="primary"
                            className={classes.input}
                            onChange={ (event)=>{
                                setTitle(event.target.value)
                            } }
                            />
                    </div>
                    <div className={classNames(style.Form)}>
                        <TextField
                            label="Start time"
                            type="datetime-local"
                            variant="filled"
                            defaultValue={new Date()}
                            className={classes.input}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </div>
                    <div className={classNames(style.Form)}>
                        <TextField
                            label="Deadline"
                            type="datetime-local"
                            variant="filled"
                            defaultValue={new Date()}
                            className={classes.input}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </div>
                    <div className={classNames(style.Form)}>
                        <h2>Category</h2>
                        <Select
                            labelId="demo-mutiple-checkbox-label"
                            id="demo-mutiple-checkbox"
                            input={<Input />}
                            className={classes.select}
                            value={category}
                            variant="filled"
                            renderValue={()=>{return category}}
                            onChange={ (event)=>{
                                setCategory(event.target.value as any as string)
                            } }
                        // MenuProps={MenuProps}
                        >   
                            <MenuItem key={"d"} value={"hoge"}>
                                <div style={{width:30,height:30,backgroundColor:"#004dff"}}></div>
                                <ListItemText primary={"fuga"} />
                            </MenuItem>
                            <MenuItem key={"ddd"} value={"hoge"}>
                                <div style={{width:30,height:30,backgroundColor:"#fff"}}></div>
                                <ListItemText primary={"fuga"} />
                            </MenuItem>
                            <MenuItem key={"dd"} value={"hoge"}>
                                <div style={{width:30,height:30,backgroundColor:"#000"}}></div>
                                <ListItemText primary={"fuga"} />
                            </MenuItem>
                        </Select>
                    </div>
                    <div className={classNames(style.Form)}>
                        <h2>Importance</h2>
                        <Select
                            labelId="demo-mutiple-checkbox-label"
                            id="demo-mutiple-checkbox"
                            input={<Input />}
                            className={classes.select}
                            value={category}
                            variant="filled"
                            renderValue={()=>{return category}}
                            onChange={ (event)=>{
                                setCategory(event.target.value as any as string)
                            } }
                        // MenuProps={MenuProps}
                        >   
                            <MenuItem key={"d"} value={"hoge"}>
                                <div style={{width:30,height:30,backgroundColor:"#004dff"}}></div>
                                <ListItemText primary={"fuga"} />
                            </MenuItem>
                            <MenuItem key={"ddd"} value={"hoge"}>
                                <div style={{width:30,height:30,backgroundColor:"#fff"}}></div>
                                <ListItemText primary={"fuga"} />
                            </MenuItem>
                            <MenuItem key={"dd"} value={"hoge"}>
                                <div style={{width:30,height:30,backgroundColor:"#000"}}></div>
                                <ListItemText primary={"fuga"} />
                            </MenuItem>
                        </Select>
                    </div>
                    <div className={classNames(style.Form)}>
                        <h2>Detail</h2>
                        <TextareaAutosize 
                            aria-label="Detail" 
                            rowsMin={3} 
                            rowsMax={10} 
                            placeholder="Detail" 
                            value={detail} 
                            onChange={ (event)=>{
                                setDetail(event.target.value)
                            } }
                            className={classes.input + " " + style.DetailForm}
                        />
                    </div>
                </div>
            </div>
        </ThemeProvider>
    ) 
}

// class="MuiInputBase-root MuiFilledInput-root MuiFilledInput-underline makeStyles-input-20 MuiInputBase-formControl MuiInputBase-marginDense MuiFilledInput-marginDense"