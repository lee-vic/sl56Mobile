import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { SignalR, SignalRConnection } from 'ng2-signalr';
import { apiUrl } from '../../globals';
import { ProblemProvider } from '../../providers/problem/problem';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage implements OnInit, OnDestroy {
  signalRConnection: SignalRConnection;
  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: ElementRef;
  msgList: any[] = [];
  user: any;
  toUser: any;
  editorMsg = '';
  data: any;
  serverUrl:string=apiUrl;
  imageURI:any;
  imageFileName:any;
  ngOnDestroy(): void {
    this.signalRConnection.stop();
  }
  ngOnInit(): void {

    this.signalRConnection = this.signalR.createConnection();
    this.signalRConnection.status.subscribe((p) => console.warn(p.name));
    this.signalRConnection.start().then((c) => {
      let listener = c.listenFor("messageReceived");
      listener.subscribe((msg: any) => {
     
        let obj = JSON.parse(msg);
        console.log(obj);
        let content="";
        if(obj.IsFile==true)
          content=obj.FileName;
        else
          content=obj.MsgContent;
        this.pushNewMsg(content,1,obj.SenderName,obj.IsFile,obj.ObjectId);
        this.signalRConnection.invoke("markIsSend",obj.ObjectId);
      });
    });
  }

  constructor(public navCtrl: NavController,
    private signalR: SignalR,
    public service: ProblemProvider,
    public navParams: NavParams) {
    this.data = navParams.get("model");
    this.data.ChatRecords.forEach(element => {
      if (element.Type === 1){
        element.avatar = "assets/imgs/chat-1.png";
      }
      else {
        element.avatar = "assets/imgs/chat-2.png";
        element.Name="我";
      }
    });
    console.log(this.data);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
    this.scrollToBottom();
  }
  sendMsg() {
    if (!this.editorMsg.trim()) return;

    this.signalRConnection.invoke("sendToEmployee",this.data.Id,this.editorMsg,0,"",0,"",this.data.Problem.ObjectId).then((data:any)=>{
      this.pushNewMsg(this.editorMsg,0,"",false,data);
      this.editorMsg = '';
      console.log(data);
    });

  }
  onFocus() {

    this.content.resize();
    this.scrollToBottom();
  }
  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }
  /**
   * 
   * @param msg 消息内容
   * @param type -1：会话转接 0：客户发给内部职员；1：内部职员发送给客户
   * @param username 发送消息方姓名
   */
  pushNewMsg(msg:string,type:number,username:string,isFile:boolean,objectId:number){
    if(username=="")
      username="我";
    let obj:any={
      Content:msg,
      Date:Date.now().toString(),
      Name:username,
      Type:type,
      IsFile:isFile,
      Id:objectId
    };
    if(type==1){
      obj.avatar="assets/imgs/chat-1.png";
    }
    else{
      obj.avatar="assets/imgs/chat-2.png";
    }
    console.log(obj);
    this.data.ChatRecords.push(obj);
    this.scrollToBottom();
  }
  upload(files) {
    if (files.length === 0)
      return;

    const formData = new FormData();

    for (let file of files)
      formData.append(file.name, file);

    this.service.upload(formData).subscribe(res=>{

    });
  }
}
