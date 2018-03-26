<template>
  <div>
    <section v-if="!showLoading" class="shop_container">
      <nav class="goback" @click="goback">
        <svg width="4rem" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:3"/>
        </svg>
      </nav>
      <header class="shop_detail_header" ref="shopheader" :style="{zIndex: showActivities? '14':'10'}">
        <img :src="imgBaseUrl + shopDetailData.image_path" class="header_cover_img">
        <section class="description_header">
          <router-link to="/shop/shopDetail" class="description_top">
            <section class="description_left">
              <img :src="imgBaseUrl + shopDetailData.image_path">
            </section>
            <section class="description_right">
              <h4 class="description_title ellipsis">{{shopDetailData.name}}</h4>
              <p class="description_text">商家配送／{{shopDetailData.order_lead_time}}分钟送达／配送费¥{{shopDetailData.float_delivery_fee}}</p>
              <p class="description_promotion ellipsis">公告：{{promotionInfo}}</p>
            </section>
            <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description_arrow">
              <path d="M0 0 L8 7 L0 14" stroke="#fff" stroke-width="1" fill="none"/>
            </svg>
          </router-link>
          <footer class="description_footer" v-if="shopDetailData.activities.length" @click="showActivitiesFun">
            <p class="ellipsis">
              <span class="tip_icon" :style="{backgroundColor: '#' + shopDetailData.activities[0].icon_color, borderColor: '#' + shopDetailData.activities[0].icon_color}">{{shopDetailData.activities[0].icon_name}}</span>
              <span>{{shopDetailData.activities[0].description}}（APP专享）</span>
            </p>
            <p>{{shopDetailData.activities.length}}个活动</p>
            <svg class="footer_arrow">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-left"></use>
            </svg>
          </footer>

        </section>
      </header>
      <transition name="fade">
        <section class="activities_details" v-if="showActivities">
          <h2 class="activities_shoptitle">{{shopDetailData.name}}</h2>
          <h3 class="activities_ratingstar">
            <rating-star :rating='shopDetailData.rating'></rating-star>
          </h3>
          <section class="activities_list">
            <header class="activities_title_style">
              <span>优惠信息</span>
            </header>
            <ul>
              <li v-for="item in shopDetailData.activities" :key="item.id">
                <span class="activities_icon" :style="{backgroundColor: '#' + item.icon_color, borderColor: '#' + item.icon_color}">{{item.icon_name}}</span>
                <span>{{item.description}}（APP专享）</span>
              </li>
            </ul>
          </section>
          <section class="activities_shopinfo">
            <header class="activities_title_style">
              <span>商家公告</span>
            </header>
            <p>{{promotionInfo}}</p>
          </section>
          <svg width="60" height="60" class="close_activities" @click.stop="showActivitiesFun">
            <circle cx="30" cy="30" r="25" stroke="#555" stroke-width="1" fill="none"/>
            <line x1="22" y1="38" x2="38" y2="22" style="stroke:#999;stroke-width:2"/>
            <line x1="22" y1="22" x2="38" y2="38" style="stroke:#999;stroke-width:2"/>
          </svg>
        </section>
      </transition>
      <!--<section class="change_show_type" ref="chooseType">-->
        <!--<div>-->
          <!--<span :class='{activity_show: changeShowType =="food"}' @click="changeShowType='food'">商品</span>-->
        <!--</div>-->
        <!--<div>-->
          <!--<span :class='{activity_show: changeShowType =="rating"}' @click="changeShowType='rating'">评价</span>-->
        <!--</div>-->
      <!--</section>-->
      <!--<transition name="fade-choose">-->
        <!--<section v-show="changeShowType =='food'" class="food_container">-->
          <!--<section class="menu_container">-->
            <!--<section class="menu_left" id="wrapper_menu" ref="wrapperMenu">-->
              <!--<ul>-->
                <!--<li v-for="(item,index) in menuList" :key="index" class="menu_left_li" :class="{activity_menu: index == menuIndex}" @click="chooseMenu(index)">-->
                  <!--<img :src="getImgPath(item.icon_url)" v-if="item.icon_url">-->
                  <!--<span>{{item.name}}</span>-->
                  <!--<span class="category_num" v-if="categoryNum[index]&&item.type==1">{{categoryNum[index]}}</span>-->
                <!--</li>-->
              <!--</ul>-->
            <!--</section>-->
            <!--<section class="menu_right" ref="menuFoodList">-->
              <!--<ul>-->
                <!--<li v-for="(item,index) in menuList" :key="index">-->
                  <!--<header class="menu_detail_header">-->
                    <!--<section class="menu_detail_header_left">-->
                      <!--<strong class="menu_item_title">{{item.name}}</strong>-->
                      <!--<span class="menu_item_description">{{item.description}}</span>-->
                    <!--</section>-->
                    <!--<span class="menu_detail_header_right" @click="showTitleDetail(index)"></span>-->
                    <!--<p class="description_tip" v-if="index == TitleDetailIndex">-->
                      <!--<span>{{item.name}}</span>-->
                      <!--{{item.description}}-->
                    <!--</p>-->
                  <!--</header>-->
                  <!--<section v-for="(foods,foodindex) in item.foods" :key="foodindex" class="menu_detail_list">-->
                    <!--<router-link :to="{path: 'shop/foodDetail', query:{image_path:foods.image_path, description: foods.description, month_sales: foods.month_sales, name: foods.name, rating: foods.rating, rating_count: foods.rating_count, satisfy_rate: foods.satisfy_rate, foods, shopId}}"-->
                                 <!--tag="div" class="menu_detail_link">-->
                      <!--<section class="menu_food_img">-->
                        <!--<img :src="imgBaseUrl + foods.image_path">-->
                      <!--</section>-->
                      <!--<section class="menu_food_description">-->
                        <!--<h3 class="food_description_head">-->
                          <!--<strong class="description_foodname">{{foods.name}}</strong>-->
                          <!--<ul v-if="foods.attributes.length" class="attributes_ul">-->
                            <!--<li v-for="(attribute, foodindex) in foods.attributes" :key="foodindex" :style="{color: '#' + attribute.icon_color,borderColor:'#' +attribute.icon_color}"-->
                                <!--:class="{attribute_new: attribute.icon_name == '新'}">-->
                              <!--<p :style="{color: attribute.icon_name == '新'? '#fff' : '#' + attribute.icon_color}">{{attribute.icon_name == '新'? '新品':attribute.icon_name}}</p>-->
                            <!--</li>-->
                          <!--</ul>-->

                        <!--</h3>-->
                        <!--<p class="food_description_content">{{foods.description}}</p>-->
                        <!--<p class="food_description_sale_rating">-->
                          <!--<span>月售{{foods.month_sales}}份</span>-->
                          <!--<span>好评率{{foods.satisfy_rate}}%</span>-->
                        <!--</p>-->
                        <!--<p v-if="foods.activity" class="food_activity">-->
                          <!--<span :style="{color: '#' + foods.activity.image_text_color,borderColor:'#' +foods.activity.icon_color}">{{foods.activity.image_text}}</span>-->
                        <!--</p>-->
                      <!--</section>-->
                    <!--</router-link>-->
                    <!--<footer class="menu_detail_footer">-->
                      <!--<section class="food_price">-->
                        <!--<span>¥</span>-->
                        <!--<span>{{foods.specfoods[0].price}}</span>-->
                        <!--<span v-if="foods.specifications.length">起</span>-->
                      <!--</section>-->
                      <!--<buy-cart :shopId='shopId' :foods='foods' @moveInCart="listenInCart" @showChooseList="showChooseList" @showReduceTip="showReduceTip"-->
                                <!--@showMoveDot="showMoveDotFun"></buy-cart>-->
                    <!--</footer>-->
                  <!--</section>-->
                <!--</li>-->
              <!--</ul>-->
            <!--</section>-->
          <!--</section>-->
          <!--<section class="buy_cart_container">-->
            <!--<section @click="toggleCartList" class="cart_icon_num">-->
              <!--<div class="cart_icon_container" :class="{cart_icon_activity: totalPrice > 0, move_in_cart:receiveInCart}" ref="cartContainer">-->
                <!--<span v-if="totalNum" class="cart_list_length">-->
                  <!--{{totalNum}}-->
                <!--</span>-->
                <!--<svg class="cart_icon">-->
                  <!--<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-icon"></use>-->
                <!--</svg>-->
              <!--</div>-->
              <!--<div class="cart_num">-->
                <!--<div>¥ {{totalPrice}}</div>-->
                <!--<div>配送费¥{{deliveryFee}}</div>-->
              <!--</div>-->
            <!--</section>-->
            <!--<section class="gotopay" :class="{gotopay_acitvity: minimumOrderAmount <= 0}">-->
              <!--<span class="gotopay_button_style" v-if="minimumOrderAmount > 0">还差¥{{minimumOrderAmount}}起送</span>-->
              <!--<router-link :to="{path:'/confirmOrder', query:{geohash, shopId}}" class="gotopay_button_style" v-else>去结算</router-link>-->
            <!--</section>-->
          <!--</section>-->
          <!--<transition name="toggle-cart">-->
            <!--<section class="cart_food_list" v-show="showCartList&&cartFoodList.length">-->
              <!--<header>-->
                <!--<h4>购物车</h4>-->
                <!--<div @click="clearCart">-->
                  <!--<svg>-->
                    <!--<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-remove"></use>-->
                  <!--</svg>-->
                  <!--<span class="clear_cart">清空</span>-->
                <!--</div>-->
              <!--</header>-->
              <!--<section class="cart_food_details" id="cartFood">-->
                <!--<ul>-->
                  <!--<li v-for="(item, index) in cartFoodList" :key="index" class="cart_food_li">-->
                    <!--<div class="cart_list_num">-->
                      <!--<p class="ellipsis">{{item.name}}</p>-->
                      <!--<p class="ellipsis">{{item.specs}}</p>-->
                    <!--</div>-->
                    <!--<div class="cart_list_price">-->
                      <!--<span>¥</span>-->
                      <!--<span>{{item.price}}</span>-->
                    <!--</div>-->
                    <!--<section class="cart_list_control">-->
                      <!--<span @click="removeOutCart(item.category_id, item.item_id, item.food_id, item.name, item.price, item.specs)">-->
                        <!--<svg>-->
                          <!--<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>-->
                        <!--</svg>-->
                      <!--</span>-->
                      <!--<span class="cart_num">{{item.num}}</span>-->
                      <!--<svg class="cart_add" @click="addToCart(item.category_id, item.item_id, item.food_id, item.name, item.price, item.specs)">-->
                        <!--<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>-->
                      <!--</svg>-->
                    <!--</section>-->
                  <!--</li>-->
                <!--</ul>-->
              <!--</section>-->
            <!--</section>-->
          <!--</transition>-->
          <!--<transition name="fade">-->
            <!--<div class="screen_cover" v-show="showCartList&&cartFoodList.length" @click="toggleCartList"></div>-->
          <!--</transition>-->
        <!--</section>-->
      <!--</transition>-->
      <!--<transition name="fade-choose">-->
      <!--<section class="rating_container" id="ratingContainer" v-show="changeShowType =='rating'">-->
      <!--<section v-load-more="loaderMoreRating" type="2">-->
      <!--<section>-->

      <!--<header class="rating_header">-->
      <!--<section class="rating_header_left">-->
      <!--<p>{{shopDetailData.rating}}</p>-->
      <!--<p>综合评价</p>-->
      <!--<p>高于周边商家{{(ratingScoresData.compare_rating*100).toFixed(1)}}%</p>-->
      <!--</section>-->
      <!--<section class="rating_header_right">-->
      <!--<p>-->
      <!--<span>服务态度</span>-->
      <!--<rating-star :rating='ratingScoresData.service_score'></rating-star>-->
      <!--<span class="rating_num">{{ratingScoresData.service_score.toFixed(1)}}</span>-->
      <!--</p>-->
      <!--<p>-->
      <!--<span>菜品评价</span>-->
      <!--<rating-star :rating='ratingScoresData.food_score'></rating-star>-->
      <!--<span class="rating_num">{{ratingScoresData.food_score.toFixed(1)}}</span>-->
      <!--</p>-->
      <!--<p>-->
      <!--<span>送达时间</span>-->
      <!--<span class="delivery_time">{{shopDetailData.order_lead_time}}分钟</span>-->
      <!--</p>-->
      <!--</section>-->
      <!--</header>-->
      <!--<ul class="tag_list_ul">-->
      <!--<li v-for="(item, index) in ratingTagsList" :key="index" :class="{unsatisfied: item.unsatisfied, tagActivity: ratingTageIndex == index}"-->
      <!--@click="changeTgeIndex(index, item.name)">{{item.name}}({{item.count}})</li>-->
      <!--</ul>-->
      <!--<ul class="rating_list_ul">-->
      <!--<li v-for="(item, index) in ratingList" :key="index" class="rating_list_li">-->
      <!--<img :src="getImgPath(item.avatar)" class="user_avatar">-->
      <!--<section class="rating_list_details">-->
      <!--<header>-->
      <!--<section class="username_star">-->
      <!--<p class="username">{{item.username}}</p>-->
      <!--<p class="star_desc">-->
      <!--<rating-star :rating='item.rating_star'></rating-star>-->
      <!--<span class="time_spent_desc">{{item.time_spent_desc}}</span>-->
      <!--</p>-->
      <!--</section>-->
      <!--<time class="rated_at">{{item.rated_at}}</time>-->
      <!--</header>-->
      <!--<ul class="food_img_ul">-->
      <!--<li v-for="(item, index) in item.item_ratings" :key="index">-->
      <!--<img :src="getImgPath(item.image_hash)" v-if="item.image_hash">-->
      <!--</li>-->
      <!--</ul>-->
      <!--<ul class="food_name_ul">-->
      <!--<li v-for="(item, index) in item.item_ratings" :key="index" class="ellipsis">-->
      <!--{{item.food_name}}-->
      <!--</li>-->
      <!--</ul>-->
      <!--</section>-->
      <!--</li>-->
      <!--</ul>-->
      <!--</section>-->
      <!--</section>-->
      <!--</section>-->
      <!--</transition>-->
    </section>

    <loading v-show="showLoading || loadRatings"></loading>
  </div>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'
  import {
    msiteAdress,
    shopDetails,
    foodMenu,
    getRatingList,
    ratingScores,
    ratingTags
  } from "../../service/getData"
  import {
    imgBaseUrl
  } from "../../config/env"
  import {
    loadMore,
    getImgPath
  } from "../../components/common/mixin"
  import loading from "../../components/common/loading"

  export default {
    name: "shop",
    data() {
      return {
        geohash: "", //geohash位置信息
        shopId: null, //商店id值
        showLoading: true, //显示加载动画
        loadRatings: false, //加载更多评论时显示加载组件
        shopDetailData: null, //商铺详情
        menuList: [], //食品列表
        ratingList: null, //评价列表
        ratingScoresData: null, //评价总体分数
        ratingTagsList: null, //评价分类列表
        ratingOffset: 0, //评价获取数据offset值
        showActivities: false, //是否显示活动详情
        changeShowType: "food", //切换显示商品或者评价
        menuIndex: 0, //已选菜单索引值，默认为0
        menuIndexChange: true, //解决选中index时，scroll监听事件重复判断设置index的bug
        categoryNum: [], //商品类型右上角已加入购物车的数量
        imgBaseUrl
      }
    },
    created() {
      this.geohash = this.$route.query.geohash
      this.shopId = this.$route.query.id
      this.INIT_BUYCART()
    },
    mounted() {
      this.initData();
    },
    components: {
      loading
    },
    mixins: [loadMore, getImgPath],
    computed: {
      ...mapState(["latitude", "longitude", "cartList"]),
      promotionInfo: function () {
        return (
          this.shopDetailData.promotion_info ||
          "欢迎光临，用餐高峰期请提前下单，谢谢。"
        );
      },
    },
    methods: {
      ...mapMutations([
        "INIT_BUYCART",
        "RECORD_ADDRESS",
        "RECORD_SHOPDETAIL"
      ]),
      //初始化时获取基本数据
      async initData() {
        if (!this.latitude) {
          //获取位置信息
          let res = await msiteAdress(this.geohash);
          // 记录当前经度纬度进入vuex
          this.RECORD_ADDRESS(res);
        }
        //获取商铺信息
        this.shopDetailData = await shopDetails(
          this.shopId,
          this.latitude,
          this.longitude
        );
        console.log('获取商铺信息')
        console.log(this.shopDetailData)
        console.log('----------')
        //获取商铺食品列表
        this.menuList = await foodMenu(this.shopId);
        console.log('获取商铺食品列表')
        console.log(this.menuList)
        console.log('----------')
        //评论列表
        this.ratingList = await getRatingList(this.shopId, this.ratingOffset);
        console.log('评论列表')
        console.log(this.ratingList)
        console.log('----------')
        //商铺评论详情
        this.ratingScoresData = await ratingScores(this.shopId);
        console.log('商铺评论详情')
        console.log(this.ratingScoresData)
        console.log('----------')
        //评论Tag列表
        this.ratingTagsList = await ratingTags(this.shopId);
        console.log('评论Tag列表')
        console.log(this.ratingTagsList)
        console.log('----------')
        this.RECORD_SHOPDETAIL(this.shopDetailData)
        //隐藏加载动画
        this.hideLoading();
      },
      goback() {
        this.$router.go(-1);
      },
      //隐藏动画
      hideLoading() {
        this.showLoading = false;
      },
      //控制活动详情页的显示隐藏
      showActivitiesFun() {
        this.showActivities = !this.showActivities;
      },
      //商品、评论切换状态
      // changeShowType: function (value) {
      //
      // }
    }

  }
</script>

<style lang="scss" scoped>
  @import "../../style/mixin";

  @keyframes mymove {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(1.1);
    }
    75% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
  }

  @-moz-keyframes mymove {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(1.1);
    }
    75% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
  }

  @-webkit-keyframes mymove {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(1.1);
    }
    75% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
  }

  @-o-keyframes mymove {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(1.1);
    }
    75% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
  }

  .shop_back_svg_container {
    position: fixed;
    @include wh(100%, 100%);
    img {
      @include wh(100%, 100%);
    }
  }

  .shop_container {
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 0;
    left: 0;
    height: 100%;
  }

  .goback {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 2rem;
    z-index: 11;
    padding-top: 0.2rem;
    padding-left: 0.2rem;
  }

  .shop_detail_header {
    overflow: hidden;
    position: relative;
    .header_cover_img {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 9;
      filter: blur(10px);
    }
    .description_header {
      position: relative;
      z-index: 10;
      background-color: rgba(119, 103, 137, 0.43);
      padding: 0.4rem 0 0.4rem 0.4rem;
      width: 100%;
      overflow: hidden;
      .description_top {
        display: flex;
        .description_left {
          margin-right: 0.3rem;
          img {
            @include wh(2.9rem, 2.9rem);
            display: block;
            border-radius: 0.15rem;
          }
        }
        .description_right {
          flex: 1;
          .description_title {
            @include sc(0.8rem, #fff);
            font-weight: bold;
            width: 100%;
            margin-bottom: 0.3rem;
          }
          .description_text {
            @include sc(0.5rem, #fff);
            margin-bottom: 0.3rem;
          }
          .description_promotion {
            @include sc(0.5rem, #fff);
            width: 11.5rem;
          }
        }
        .description_arrow {
          @include ct;
          right: 0.3rem;
          z-index: 11;
        }
      }
      .description_footer {
        @include fj;
        margin-top: 0.5rem;
        padding-right: 1rem;
        position: relative;
        p {
          @include sc(0.5rem, #fff);
          span {
            color: #fff;
          }
          .tip_icon {
            padding: 0 0.04rem;
            border: 0.025rem solid #fff;
            border-radius: 0.1rem;
            font-size: 0.4rem;
            display: inline-block;
          }
        }
        .ellipsis {
          width: 84%;
        }
        .footer_arrow {
          @include wh(0.45rem, 0.45rem);
          position: absolute;
          top: 0.1rem;
          right: 0.3rem;
        }
      }
    }
  }

  .activities_details {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #262626;
    z-index: 200;
    padding: 1.25rem;
    .activities_shoptitle {
      text-align: center;
      @include sc(0.8rem, #fff);
    }
    .activities_ratingstar {
      display: flex;
      justify-content: center;
      transform: scale(2.2);
      margin-top: 0.7rem;
    }
    .activities_list {
      margin-top: 1.5rem;
      margin-bottom: 1rem;
      @include sc(0.5rem, #fff);
      li {
        margin-bottom: 0.2rem;
        .activities_icon {
          padding: 0 0.02rem;
          display: inline-block;
          border: 0.025rem solid #fff;
          border-radius: 0.1rem;
        }
        span {
          color: #fff;
          line-height: 0.6rem;
        }
      }
    }
    .activities_shopinfo {
      p {
        line-height: 0.7rem;
        @include sc(0.5rem, #fff);
      }
    }
    .activities_title_style {
      text-align: center;
      margin-bottom: 1rem;
      span {
        @include sc(0.5rem, #fff);
        border: 0.025rem solid #555;
        padding: 0.2rem 0.4rem;
        border-radius: 0.5rem;
      }
    }
    .close_activities {
      position: absolute;
      bottom: 1rem;
      @include cl;
    }
  }

  .food_container {
    display: flex;
    flex: 1;
    padding-bottom: 2rem;
  }

  .menu_container {
    display: flex;
    flex: 1;
    overflow-y: hidden;
    position: relative;
    .menu_left {
      width: 3.8rem;
      .menu_left_li {
        padding: 0.7rem 0.3rem;
        border-bottom: 0.025rem solid #ededed;
        box-sizing: border-box;
        border-left: 0.15rem solid #f8f8f8;
        position: relative;
        img {
          @include wh(0.5rem, 0.6rem);
        }
        span {
          @include sc(0.6rem, #666);
        }
        .category_num {
          position: absolute;
          top: 0.1rem;
          right: 0.1rem;
          background-color: #ff461d;
          line-height: 0.6rem;
          text-align: center;
          border-radius: 50%;
          border: 0.025rem solid #ff461d;
          min-width: 0.6rem;
          height: 0.6rem;
          @include sc(0.5rem, #fff);
          font-family: Helvetica Neue, Tahoma, Arial;
        }
      }
      .activity_menu {
        border-left: 0.15rem solid #3190e8;
        background-color: #fff;
        span:nth-of-type(1) {
          font-weight: bold;
        }
      }
    }
    .menu_right {
      flex: 4;
      overflow-y: auto;
      .menu_detail_header {
        width: 100%;
        padding: 0.4rem;
        position: relative;
        @include fj;
        align-items: center;
        .menu_detail_header_left {
          width: 11rem;
          white-space: nowrap;
          overflow: hidden;
          .menu_item_title {
            @include sc(0.7rem, #666);
            font-weight: bold;
          }
          .menu_item_description {
            @include sc(0.5rem, #999);
            width: 30%;
            overflow: hidden;
          }
        }
        .menu_detail_header_right {
          @include wh(0.5rem, 1rem);
          display: block;
          @include bis("../../images/icon_point.png");
          background-size: 100% 0.4rem;
          background-position: left center;
        }
        .description_tip {
          background-color: #39373a;
          opacity: 0.95;
          @include sc(0.5rem, #fff);
          position: absolute;
          top: 1.5rem;
          z-index: 14;
          width: 8rem;
          right: 0.2rem;
          padding: 0.5rem 0.4rem;
          border: 1px;
          border-radius: 0.2rem;
          span {
            color: #fff;
            line-height: 0.6rem;
            font-size: 0.55rem;
          }
        }
        .description_tip::after {
          content: "";
          position: absolute;
          @include wh(0.4rem, 0.4rem);
          background-color: #39373a;
          top: -0.5rem;
          right: 0.7rem;
          transform: rotate(-45deg) translateY(0.41rem);
        }
      }
      .menu_detail_list {
        background-color: #fff;
        padding: 0.6rem 0.4rem;
        border-bottom: 1px solid #f8f8f8;
        position: relative;
        overflow: hidden;
        .menu_detail_link {
          display: flex;
          .menu_food_img {
            margin-right: 0.4rem;
            img {
              @include wh(2rem, 2rem);
              display: block;
            }
          }
          .menu_food_description {
            width: 100%;
            .food_description_head {
              @include fj;
              margin-bottom: 0.2rem;
              .description_foodname {
                @include sc(0.7rem, #333);
              }
              .attributes_ul {
                display: flex;
                li {
                  font-size: 0.3rem;
                  height: 0.6rem;
                  line-height: 0.35rem;
                  padding: 0.1rem;
                  border: 1px solid #666;
                  border-radius: 0.3rem;
                  margin-right: 0.1rem;
                  transform: scale(0.8);
                  p {
                    white-space: nowrap;
                  }
                }
                .attribute_new {
                  position: absolute;
                  top: 0;
                  left: 0;
                  background-color: #4cd964;
                  @include wh(2rem, 2rem);
                  display: flex;
                  align-items: flex-end;
                  transform: rotate(-45deg) translate(-0.1rem, -1.5rem);
                  border: none;
                  border-radius: 0;
                  p {
                    @include sc(0.4rem, #fff);
                    text-align: center;
                    flex: 1;
                  }
                }
              }
            }
            .food_description_content {
              @include sc(0.5rem, #999);
              line-height: 0.6rem;
            }
            .food_description_sale_rating {
              line-height: 0.8rem;
              span {
                @include sc(0.5rem, #333);
              }
            }
            .food_activity {
              line-height: 0.4rem;
              span {
                font-size: 0.3rem;
                border: 1px solid currentColor;
                border-radius: 0.3rem;
                padding: 0.08rem;
                display: inline-block;
                transform: scale(0.8);
                margin-left: -0.35rem;
              }
            }
          }
        }
        .menu_detail_footer {
          margin-left: 2.4rem;
          font-size: 0;
          margin-top: 0.3rem;
          @include fj;
          .food_price {
            span {
              font-family: "Helvetica Neue", Tahoma, Arial;
            }
            span:nth-of-type(1) {
              @include sc(0.5rem, #f60);
              margin-right: 0.05rem;
            }
            span:nth-of-type(2) {
              @include sc(0.7rem, #f60);
              font-weight: bold;
              margin-right: 0.3rem;
            }
            span:nth-of-type(3) {
              @include sc(0.5rem, #666);
            }
          }
        }
      }
    }
  }

  .buy_cart_container {
    position: absolute;
    background-color: #3d3d3f;
    bottom: 0;
    left: 0;
    z-index: 13;
    display: flex;
    @include wh(100%, 2rem);
    .cart_icon_num {
      flex: 1;
      .cart_icon_container {
        display: flex;
        background-color: #3d3d3f;
        position: absolute;
        padding: 0.4rem;
        border: 0.18rem solid #444;
        border-radius: 50%;
        left: 0.5rem;
        top: -0.7rem;
        .cart_icon {
          @include wh(1.2rem, 1.2rem);
        }
        .cart_list_length {
          position: absolute;
          top: -0.25rem;
          right: -0.25rem;
          background-color: #ff461d;
          line-height: 0.7rem;
          text-align: center;
          border-radius: 50%;
          border: 0.025rem solid #ff461d;
          min-width: 0.7rem;
          height: 0.7rem;
          @include sc(0.5rem, #fff);
          font-family: Helvetica Neue, Tahoma, Arial;
        }
      }
      .move_in_cart {
        animation: mymove 0.5s ease-in-out;
      }
      .cart_icon_activity {
        background-color: #3190e8;
      }
      .cart_num {
        @include ct;
        left: 3.5rem;

        div {
          color: #fff;
        }
        div:nth-of-type(1) {
          font-size: 0.8rem;
          font-weight: bold;
          margin-bottom: 0.1rem;
        }
        div:nth-of-type(2) {
          font-size: 0.4rem;
        }
      }
    }
    .gotopay {
      position: absolute;
      right: 0;
      background-color: #535356;
      @include wh(5rem, 100%);
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      .gotopay_button_style {
        @include sc(0.7rem, #fff);
        font-weight: bold;
      }
    }
    .gotopay_acitvity {
      background-color: #4cd964;
    }
  }

  .cart_food_list {
    position: fixed;
    width: 100%;
    padding-bottom: 2rem;
    z-index: 12;
    bottom: 0;
    left: 0;
    background-color: #fff;
    header {
      @include fj;
      align-items: center;
      padding: 0.3rem 0.6rem;
      background-color: #eceff1;
      svg {
        @include wh(0.6rem, 0.6rem);
        vertical-align: middle;
      }
      h4 {
        @include sc(0.7rem, #666);
      }
      .clear_cart {
        @include sc(0.6rem, #666);
      }
    }
    .cart_food_details {
      background-color: #fff;
      max-height: 20rem;
      overflow-y: auto;
      .cart_food_li {
        @include fj;
        padding: 0.6rem 0.5rem;
        .cart_list_num {
          width: 55%;
          p:nth-of-type(1) {
            @include sc(0.7rem, #666);
            font-weight: bold;
          }
          p:nth-of-type(2) {
            @include sc(0.4rem, #666);
          }
        }
        .cart_list_price {
          font-size: 0;
          span:nth-of-type(1) {
            @include sc(0.6rem, #f60);
            font-family: Helvetica Neue, Tahoma;
          }
          span:nth-of-type(2) {
            @include sc(0.7rem, #f60);
            font-family: Helvetica Neue, Tahoma;
            font-weight: bold;
          }
        }
        .cart_list_control {
          display: flex;
          align-items: center;
          span {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          svg {
            @include wh(0.9rem, 0.9rem);
            fill: #3190e8;
          }
          .specs_reduce_icon {
            fill: #999;
          }
          .cart_num {
            @include sc(0.65rem, #666);
            min-width: 1rem;
            text-align: center;
            font-family: Helvetica Neue, Tahoma;
          }
        }
      }
    }
  }

  .screen_cover {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 11;
  }

  .change_show_type {
    display: flex;
    background-color: #fff;
    padding: 0.3rem 0 0.6rem;
    border-bottom: 1px solid #ebebeb;
    div {
      flex: 1;
      text-align: center;
      span {
        @include sc(0.65rem, #666);
        padding: 0.2rem 0.1rem;
        border-bottom: 0.12rem solid #fff;
      }
      .activity_show {
        color: #3190e8;
        border-color: #3190e8;
      }
    }
  }

  .rating_container {
    flex: 1;
    overflow-y: hidden;
    flex-direction: column;
    p,
    span,
    li,
    time {
      font-family: Helvetica Neue, Tahoma, Arial;
    }
    .rating_header {
      display: flex;
      background-color: #fff;
      padding: 0.8rem 0.5rem;
      margin-bottom: 0.5rem;
      .rating_header_left {
        flex: 3;
        text-align: center;
        p:nth-of-type(1) {
          @include sc(1.2rem, #f60);
        }
        p:nth-of-type(2) {
          @include sc(0.65rem, #666);
          margin-bottom: 0.1rem;
        }
        p:nth-of-type(3) {
          @include sc(0.4rem, #999);
        }
      }
      .rating_header_right {
        flex: 4;
        p {
          font-size: 0.65rem;
          line-height: 1rem;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          span:nth-of-type(1) {
            color: #666;
            margin-right: 0.5rem;
          }
          .rating_num {
            width: 3rem;
            @include sc(0.55rem, #f60);
          }
          .delivery_time {
            @include sc(0.4rem, #999);
          }
        }
      }
    }
    .tag_list_ul {
      display: flex;
      flex-wrap: wrap;
      background-color: #fff;
      padding: 0.5rem;
      li {
        @include sc(0.6rem, #6d7885);
        padding: 0.3rem 0.3rem;
        background-color: #ebf5ff;
        border-radius: 0.2rem;
        border: 1px;
        margin: 0 0.4rem 0.2rem 0;
      }
      .unsatisfied {
        background-color: #f5f5f5;
        color: #aaa;
      }
      .tagActivity {
        background-color: #3190e8;
        color: #fff;
      }
    }
    .rating_list_ul {
      background-color: #fff;
      padding: 0 0.5rem;
      .rating_list_li {
        border-top: 1px solid #f1f1f1;
        display: flex;
        padding: 0.6rem 0;
        .user_avatar {
          @include wh(1.5rem, 1.5rem);
          border: 0.025rem;
          border-radius: 50%;
          margin-right: 0.8rem;
        }
        .rating_list_details {
          flex: 1;
          header {
            display: flex;
            flex: 1;
            justify-content: space-between;
            margin-bottom: 0.3rem;
            .username_star {
              @include sc(0.55rem, #666);
              .username {
                color: #666;
                margin-bottom: 0.2rem;
              }
              .star_desc {
                display: flex;
                align-items: center;
                .time_spent_desc {
                  @include sc(0.55rem, #666);
                  margin-left: 0.15rem;
                }
              }
            }
            .rated_at {
              @include sc(0.4rem, #999);
            }
          }
          .food_img_ul {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 0.4rem;
            li {
              img {
                @include wh(3rem, 3rem);
                margin-right: 0.4rem;
                display: block;
              }
            }
          }
          .food_name_ul {
            display: flex;
            flex-wrap: wrap;
            li {
              @include sc(0.55rem, #999);
              width: 2.2rem;
              padding: 0.2rem;
              border: 0.025rem solid #ebebeb;
              border-radius: 0.15rem;
              margin-right: 0.3rem;
              margin-bottom: 4px;
            }
          }
        }
      }
    }
  }

  .specs_cover {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 17;
  }

  .specs_list {
    position: fixed;
    top: 35%;
    left: 15%;
    width: 70%;
    background-color: #fff;
    z-index: 18;
    border: 1px;
    border-radius: 0.2rem;
    .specs_list_header {
      h4 {
        @include sc(0.7rem, #222);
        font-weight: normal;
        text-align: center;
        padding: 0.5rem;
      }
      .specs_cancel {
        position: absolute;
        right: 0.5rem;
        top: 0.5rem;
      }
    }
    .specs_details {
      padding: 0.5rem;
      .specs_details_title {
        @include sc(0.6rem, #666);
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        padding: 0.4rem 0;
        li {
          font-size: 0.6rem;
          padding: 0.3rem 0.5rem;
          border: 0.025rem solid #ddd;
          border-radius: 0.2rem;
          margin-right: 0.5rem;
          margin-bottom: 0.2rem;
        }
        .specs_activity {
          border-color: #3199e8;
          color: #3199e8;
        }
      }
    }
    .specs_footer {
      @include fj;
      align-items: center;
      background-color: #f9f9f9;
      padding: 0.5rem;
      border: 1px;
      border-bottom-left-radius: 0.2rem;
      border-bottom-right-radius: 0.2rem;
      .specs_price {
        span {
          color: #ff6000;
        }
        span:nth-of-type(1) {
          font-size: 0.5rem;
        }
        span:nth-of-type(2) {
          font-size: 0.8rem;
          font-weight: bold;
          font-family: Helvetica Neue, Tahoma;
        }
      }
      .specs_addto_cart {
        @include wh(4rem, 1.3rem);
        background-color: #3199e8;
        border: 1px;
        border-radius: 0.15rem;
        @include sc(0.6rem, #fff);
        text-align: center;
        line-height: 1.3rem;
      }
    }
  }

  .show_delete_tip {
    position: fixed;
    top: 50%;
    left: 15%;
    width: 70%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 18;
    @include sc(0.65rem, #fff);
    text-align: center;
    padding: 0.5rem 0;
    border: 1px;
    border-radius: 0.25rem;
  }

  .move_dot {
    position: fixed;
    bottom: 30px;
    left: 30px;

    svg {
      @include wh(0.9rem, 0.9rem);
      fill: #3190e8;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  .fade-choose-enter-active,
  .fade-choose-leave-active {
    transition: opacity 0.5s;
  }

  .fade-choose-leave,
  .fade-choose-leave-active {
    display: none;
  }

  .fade-choose-enter,
  .fade-choose-leave-active {
    opacity: 0;
  }

  .router-slid-enter-active,
  .router-slid-leave-active {
    transition: all 0.4s;
  }

  .router-slid-enter,
  .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }

  .toggle-cart-enter-active,
  .toggle-cart-leave-active {
    transition: all 0.3s ease-out;
  }

  .toggle-cart-enter,
  .toggle-cart-leave-active {
    transform: translateY(100%);
  }

</style>

