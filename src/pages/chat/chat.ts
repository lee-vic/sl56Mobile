import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, ToastController } from 'ionic-angular';
import { SignalR, SignalRConnection } from 'ng2-signalr';
import { apiUrl } from '../../globals';
import { ProblemProvider } from '../../providers/problem/problem';
import { InstantMessageProvider } from '../../providers/instant-message/instant-message';

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
  messages: Array<any> = [];
  receiveGoodsDetailId: number;
  problemId: number;
  serverUrl: string = apiUrl;
  imageURI: any;
  imageFileName: any;
  isConnected: boolean = false;
  attachmentTypeId:string;
  currentEmployeeId:number;
  showFileUploadButton:boolean=false;
  /**
   * 0:非单号消息
   * 1:单号消息
   * 2:问题件消息
   */
  messageType: number;
  ngOnDestroy(): void {
    this.signalRConnection.stop();
  }
  ngOnInit(): void {

    this.signalRConnection = this.signalR.createConnection();
    this.signalRConnection.status.subscribe((p) => {
      console.warn(p.name);
      if (p.name == "connected") {
        this.isConnected = true;
        this.multiMarkIsSend();
      }
      else {
        this.isConnected = false;
      }
    });
    this.signalRConnection.start().then((c) => {
      let listener = c.listenFor("messageReceived");
      listener.subscribe((msg: any) => {

        let obj = JSON.parse(msg);
        this.currentEmployeeId=obj.MsgFrom;
        //非单号消息模式
        if (this.messageType == 0) {
          if (obj.ReceiveGoodsDetailId == null) {
            this.appendMessage(obj);
          }
        }
        //单号消息模式
        else if (this.messageType == 1) {
          if (obj.ReceiveGoodsDetailId == this.receiveGoodsDetailId) {
            this.appendMessage(obj);
          }
        }
        //问题件消息模式
        else if (this.messageType == 2) {
          //if (obj.ReceiveGoodsDetailId == this.receiveGoodsDetailId && obj.ProblemId == this.problemId) {
          if (obj.ReceiveGoodsDetailId == this.receiveGoodsDetailId) {
            this.appendMessage(obj);
          }
        }

      });
    });
    if (this.messageType == 0) {
      this.imService.getMessages2().subscribe(res => {
        this.messages = res;
        this.processMessages();
      })
    }
    else if (this.messageType == 1 && this.messages == undefined) {
      this.imService.getMessages3(this.receiveGoodsDetailId).subscribe(res => {
        this.messages = res;
        this.processMessages();
      });
    }
  }
  appendMessage(obj: any) {
    let content = "";
    if (obj.IsFile == true)
      content = obj.FileName;
    else
      content = obj.MsgContent;
    this.pushNewMsg(content, 1, obj.SenderName, obj.IsFile, obj.ObjectId, true);
    this.signalRConnection.invoke("markIsSend", obj.ObjectId);
  }
  constructor(public navCtrl: NavController,
    private signalR: SignalR,
    public service: ProblemProvider,
    public imService: InstantMessageProvider,
    public toastCtrl: ToastController,
    public navParams: NavParams) {
    this.messageType = navParams.get("messageType");
    this.receiveGoodsDetailId = navParams.get("receiveGoodsDetailId");
    this.problemId = navParams.get("problemId");
    this.messages = navParams.get("messages");
    this.attachmentTypeId=navParams.get("attachmentTypeId");
    if(this.messageType==1){
      this.showFileUploadButton=true;
    }
    else if(this.messageType==2&&this.attachmentTypeId!='null'){
      this.showFileUploadButton=true;
    }
    this.processMessages();

  }
  multiMarkIsSend() {
    if (this.messages != undefined && this.messages.length > 0 && this.isConnected == true) {
      let idList = new Array<Number>();
      this.messages.forEach((val, idx, array) => {
        if (val.IsSend == false&&val.Type==1) {
          idList.push(val.Id);
        }
      });
      if (idList.length > 0) {
        this.signalRConnection.invoke("multiMarkIsSend", idList.toString());
      }
    }
  }
  processMessages() {
    if (this.messages != undefined) {
      this.messages.forEach(element => {
        if (element.Type === 1) {
          element.avatar = "assets/imgs/chat-1.png";
        }
        else {
          element.avatar = "assets/imgs/chat-2.png";
          element.Name = "我";
        }
      });
    }
    this.scrollToBottom();
    this.multiMarkIsSend();
  }

  ionViewDidLoad() {
    this.scrollToBottom();
  }
  sendMsg() {
    if (!this.editorMsg.trim()) return;

    this.signalRConnection.invoke("sendToEmployee", this.receiveGoodsDetailId, this.editorMsg, 0, "", 0, "", this.problemId,0).then((data: any) => {
      this.pushNewMsg(this.editorMsg, 0, "", false, data, true);
      this.editorMsg = '';
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
  pushNewMsg(msg: string, type: number, username: string, isFile: boolean, objectId: number, isSned: boolean) {
    if (username == "")
      username = "我";
    let obj: any = {
      Content: msg,
      Date: Date.now().toString(),
      Name: username,
      Type: type,
      IsFile: isFile,
      Id: objectId,
      IsSend: isSned
    };
    if (type == 1) {
      obj.avatar = "assets/imgs/chat-1.png";
    }
    else {
      obj.avatar = "assets/imgs/chat-2.png";
    }
 
    this.messages.push(obj);
    this.scrollToBottom();
  }
  upload(files) {
    if (files.length === 0)
      return;

    const formData = new FormData();

    for (let file of files)
      formData.append(file.name, file);
    if(this.messageType==1){
      this.service.upload1(formData).subscribe(res => {
        if(res.Success==true){
          this.sendFileMsg(res);
        }
        else{
          let toast = this.toastCtrl.create({
            message: "上传失败,错误信息:"+res.Text,
            position: 'middle',
            duration: 1500
          });
          toast.present();
        }
      });
    }
    else if(this.messageType==2){
      formData.append("filetype",this.attachmentTypeId);
      formData.append("receiveGoodsDetailId",this.receiveGoodsDetailId.toString());
      this.service.upload(formData).subscribe(res => {
        if(res.Success==true){
          this.sendFileMsg(res);
        }
        else{
          let toast = this.toastCtrl.create({
            message: "上传失败,错误信息:"+res.Text,
            position: 'middle',
            duration: 3000
          });
          toast.present();
        }
      });
    }
   
  }
  sendFileMsg(res:any) {


    this.signalRConnection.invoke("sendToEmployee", this.receiveGoodsDetailId, res.Path, 1, res.Name, res.FileSize, this.currentEmployeeId, this.problemId,0).then((data: any) => {
      console.log(data);
      if(data!=-1){
        this.pushNewMsg(res.Name,0,"",true,data,true);
      }
      
    });

  }
}
