using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.Maui.Controls;
using Microsoft.Maui.Controls.Compatibility;
using Microsoft.Maui.Controls.Platform;
using Microsoft.Maui.Controls.PlatformConfiguration;

//using Android.Content;
//using Android.Graphics;

namespace AgendateApp.MVVM.Views.Effects
{
    public class SearchBarEffect : RoutingEffect
    {
        public SearchBarEffect() : base($"AgendateApp.{nameof(SearchBarEffect)}")
        {

        }
    }

    public class SearchBarRoundedCornerEffect : PlatformEffect
    {
        protected override void OnAttached()
        {
            //var editText = (EditText)Control;
            //var radius = Forms.Context.ToPixels(10); // Ajusta este valor según el radio de esquina que desees

            //var shape = new Android.Graphics.Drawables.ShapeDrawable(
            //    new Android.Graphics.Drawables.Shapes.RoundRectShape(new[] { 
            //        radius, radius, radius, radius, radius, radius, radius, radius 
            //    }, null, null));
            //shape.Paint.Color = editText.CurrentTextColor;
            //shape.Paint.SetStyle(Paint.Style.Stroke);
            //shape.Paint.StrokeWidth = 2;

            //editText.Background = shape;
        }

        protected override void OnDetached()
        {
        }
    }
}
