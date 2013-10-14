<h3>Waterfall是jQuery流体布局插件</h3>
<ul>
<li>当前版本: 1.0.7<br /></li>
<li>更新时间: 2013.10.13</li>
</ul>
<h3>使用方法</h3>
<ol>
<li>加载jQuery库 (需<strong>1.4+</strong>)</li>
<li>加载<code>jQuery.waterfull.min.js</code> , 必须在jQuery库之后;</li>
<li>调用接口: <code>$node.waterfall({/* 此处为设置选项, 可留空 */})</code><br>
如: <code>$('#container').waterfall({})</code>
</li>
</ol>
<h3>设置选项</h3>
<div class="highlight">
<pre><span class="p">{</span>
    <span class="nx">selector</span><span class="o">:</span><span class="mf">'.post-home'</span><span class="p">,</span>     <span class="c1">//子元素class, 可留空</span>
    <span class="nx">columnCount</span><span class="o">:</span><span class="mi">4</span><span class="p">,</span>         		 <span class="c1">// 列数,  纯数字, 可留空</span>
    <span class="nx">columnWidth</span><span class="o">:</span><span class="mi">300</span><span class="p">,</span>       		 <span class="c1">// 列宽度, 纯数字, 可留空</span>
    <span class="nx">isResizable</span><span class="o">:</span><span class="mi">false</span><span class="p">,</span>      	     <span class="c1">// 自适应浏览器宽度, 默认false</span>
    <span class="nx">end</span><span class="o">:</span><span class="s1">function(){}</span><span class="p">,</span>            <span class="c1">// 回调函数</span>
<span class="p">}</span></pre>
</div>
<p>如果你对这个插件感兴趣, 敬请关注:<br /><a href="http://mufeng.me">作者的博客</a><br /><a href="http://mufeng.me/waterfall.html">插件发布页</a><br /></p>
<p>感谢你的支持与反馈 :)<br />作者: <a href="http://mufeng.me">MuFeng</a></p>