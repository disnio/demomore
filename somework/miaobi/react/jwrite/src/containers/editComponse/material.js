import React from 'react';
import {Icon} from 'antd'
import $ from 'jquery'
import {connect} from 'react-redux';

import Common from '@/components/Common'

class Material extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : props.visible
        };
        this.seted = false;
    }
    show = () => {
        //this.props.show(this.props.editorIndex,!this.props.visible);
        var visible = this.state.visible; 
        this.setState({
            visible: !visible
        });
    }
    componentDidMount() {
        var _this = this;
        Common.addEvent(window,'resize',() => {
            var itemWidth = _this.getItwmWidth();
            $('.recommend_card_material .recommend_list .item').css({
                width: itemWidth + 'px'
            });
            _this.resetListPosition(6);
            _this.resetListPosition(7);

            
        });
        this.setEvent();
    }
resetListPosition = (t)=>{
    var _this = this;
    var itemWidth = _this.getItwmWidth();
    var left = $('.recommend_card'+ t +' .recommend_card .recommend_list').css('left');
    left = parseInt(left, 10);
    var leftCount = parseInt(left * -1 / itemWidth + 0.5, 10);
    left = leftCount * itemWidth * -1;

    $('.recommend_card'+ t +' .recommend_card .recommend_list').css({left:left + 'px'});
}

static getDerivedStateFromProps(nextProps, prevState) { 
        /* var d = nextProps.ActileMaterialData['m' + nextProps.newstype];       
        if (d && d.length === 0 && nextProps.editorIndex === 0) {
             return{
                 visible : false
             }
        }  */ 
        return  null;
    }

componentDidUpdate() { 
        var data = this.props.ActileMaterialData['m' + this.props.newstype];       

         if ( data && data.length < 3  ) {
            $(".recommend_card" + this.props.newstype + ' .recommend_card .recommend_list').animate({
                left: 0
            }, 700)
        } 
        
         
    }
    

getItwmWidth = () =>{
        var screenWidth = window.document.body.offsetWidth;
        /**
         * ??????????????? ????????? * 98%
         * ????????????????????? ???????????? * 58%
         * ??????padding: ?????????????????? - 40
         * ?????????item??? 1/3
         */ 
        var itemWidth = (((screenWidth * 98 * 58) / 10000 - 20) * 325) / 1000;

        return itemWidth;
    }
    setEvent = () => {     
        
            //????????????
            $(".recommend_card" + this.props.newstype + ' .t-right').click(() => {      
                var count = $(".recommend_card" + this.props.newstype + ' .recommend_card .recommend_list .item').length;
                 if (count > 3) { //????????????3????????????3?????????????????????
                    var itemWidth = this.getItwmWidth();      
                    var left = $(".recommend_card" + this.props.newstype + ' .recommend_card .recommend_list').css('left');
                    left = parseInt(left, 10);
                    var leftCount = parseInt(left * -1 / itemWidth + 0.5, 10);
                    left = leftCount * itemWidth * -1;
                    var _left = left;
                    //??????????????????????????????????????????????????????????????????????????????????????????3?????????????????????
                    if (count - leftCount > 3) {
                        
                        //??????????????????3????????????????????????????????????3????????????
                        if (count - leftCount > 6) {
                            _left = left - (itemWidth * 3);
                        } else {
                            //??????????????????3?????????????????????????????????????????????????????????
                            _left = left - (itemWidth * (count - leftCount - 3));
                        }

                    }
                    $(".recommend_card" + this.props.newstype + ' .recommend_card .recommend_list').animate({
                        left: _left
                    }, 700)
                }

            });

            $(".recommend_card" + this.props.newstype + ' .t-left').click(() => {
                
                var count = $(".recommend_card" + this.props.newstype + ' .recommend_card .recommend_list .item').length;
                 if (count > 3) {
                    var left = $(".recommend_card" + this.props.newstype + ' .recommend_card .recommend_list').css('left');
                    left = parseInt(left, 10);
                    if (left < 0) {
                        var itemWidth = this.getItwmWidth();      
                        var leftCount = parseInt(left * -1 / itemWidth + 0.5, 10);
                        left = leftCount * itemWidth * -1;
                        var _left = left;
                        if (leftCount > 3) {
                            _left = left + (itemWidth * 3);
                        } else {
                            _left = left + (itemWidth * leftCount);
                        }
                    } else {
                        _left = 0;
                    }
                    $(".recommend_card" + this.props.newstype + ' .recommend_card .recommend_list').animate({
                        left: _left
                    }, 700)
              }
            });
           // this.seted = true;
         

    }
/**
 * item: item
 * tag: 1 ?????? 2 ??????
 * 
 */
    replaceEditorContent = (item,tag) => {
        var _content = $.trim(item.content);
        this.props.fun(_content, this.props.editorIndex, item._id,tag);
    }
    render() {
        const _this = this;
        const {newstype} = this.props;
        const {visible} = this.state;

        var caretEle = <Icon type="caret-up"/>;
        if (!visible) {
            caretEle = <Icon type="caret-down"/>
        }

        var itemWidth =  this.getItwmWidth();      

        var data = this.props.ActileMaterialData['m' + newstype]
        var ele = [];
        if (data) {
            ele = data.map((element, index) => {
                var _content = $.trim(element.content);
                var _title = $.trim(element.title);

                return <li className="item" key={index} style={{width:itemWidth + 'px'}}>
                    <div className="recommend_title" title={_title}>
                        <span>{index + 1}</span>
                        {/* _title.length > 0 ? '???????????????'+ (_title.length < 10 ? _title : _title.substring(0, 9) + '...') : ''*/}
                    </div>
                    <div className="recommend_text" title={_content}>
                        <p className="text">
                            {_content.length < 180 ? _content : _content.substring(0, 180) + '...'}
                        </p>
                    </div>
                    <div className="recommend_label">
                        <button className="btn2" onClick={_this.replaceEditorContent.bind(_this, element,1)}>
                            <span className="iconfont icon-cr"></span>&nbsp;&nbsp;??????</button>

                        <button className="btn2" style={{background: '#8ea6b4'}} onClick={_this.replaceEditorContent.bind(_this, element,2)}> 
                              <span className="iconfont icon-cr"></span>&nbsp;&nbsp;??????</button>

                        {/* <button className="btn1" style={{cursor:'unset'}}>??????????????????</button> */}
                    </div>
                </li>
            });
        }

        return (
            <div className={"recommend_card_material recommend_card" + this.props.newstype}>
                <div
                    className="recommend_card"
                    style={{
                    display: visible
                        ? 'block'
                        : 'none'
                }}>
                    <ul className="recommend_list">
                        {ele}
                    </ul>
                    <div className="t-left">
                        <Icon type="left"/>
                    </div>
                    <div className="t-right">
                        <Icon type="right"/>
                    </div>
                </div>
                <div className="recommend_tuijian change" onClick={this.show}>
                    <span
                        style={{
                        marginRight: '10px'
                    }}>{newstype == 6 ? '??????' : '??????'}??????</span>
                    {caretEle}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const ActileMaterialData = state.ActileMaterialData;

    return {ActileMaterialData}
}

export default connect(mapStateToProps)(Material)
