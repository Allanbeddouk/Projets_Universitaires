/*
 * According to: Travaux Pratiques dans le cous INF2010 coordonnés par Tarek OULD-BACHIR
 *
 * @authors Allan BEDDOUK & Simon GÉRIN_ROZE
 * @created: 2018-08-27
 */
import java.awt.PageAttributes.ColorType;

/**
 * Classe PixelMapPlus
 * Image de type noir et blanc, tons de gris ou couleurs
 * Peut lire et ecrire des fichiers PNM
 * Implemente les methodes de ImageOperations
 * @author : Allan BEDDOUK, Simon Gérin-Roze
 * @date   : 01/10/2018
 */

public class PixelMapPlus extends PixelMap implements ImageOperations 
{
	/**
	 * Constructeur creant l'image a partir d'un fichier
	 * @param fileName : Nom du fichier image
	 */
	PixelMapPlus(String fileName)
	{
		super( fileName );
	}
	
	/**
	 * Constructeur copie
	 * @param type : type de l'image a creer (BW/Gray/Color)
	 * @param image : source
	 */
	PixelMapPlus(PixelMap image)
	{
		super(image); 
	}
	
	/**
	 * Constructeur copie (sert a changer de format)
	 * @param type : type de l'image a creer (BW/Gray/Color)
	 * @param image : source
	 */
	PixelMapPlus(ImageType type, PixelMap image)
	{
		super(type, image); 
	}
	
	/**
	 * Constructeur servant a allouer la memoire de l'image
	 * @param type : type d'image (BW/Gray/Color)
	 * @param h : hauteur (height) de l'image 
	 * @param w : largeur (width) de l'image
	 */
	PixelMapPlus(ImageType type, int h, int w)
	{
		super(type, h, w);
	}
	
	/**
	 * Genere le negatif d'une image
	 */
	public void negate()
	{
		for(int row=0; row<height; row++)
			
			for(int col=0; col<width; col++)
				
					imageData[row][col] = ( this.getPixel(row, col) ).Negative();
		
	}
	
	/**
	 * Convertit l'image vers une image en noir et blanc
	 */
	public void convertToBWImage()
	{
		for(int row=0; row<height; row++)
			
			for(int col=0; col<width; col++)
				
					imageData[row][col] = ( this.getPixel(row, col) ).toBWPixel();
		
	}
	
	/**
	 * Convertit l'image vers un format de tons de gris
	 */
	public void convertToGrayImage()
	{
		for(int row=0; row<height; row++)
			
			for(int col=0; col<width; col++)
				imageData[row][col] = ( this.getPixel(row, col) ).toGrayPixel();
		
	}
	
	/**
	 * Convertit l'image vers une image en couleurs
	 */
	public void convertToColorImage()
	{
		for(int row=0; row<height; row++)
			
			for(int col=0; col<width; col++)
				imageData[row][col] = ( this.getPixel(row, col) ).toColorPixel();
		
	}
	
	public void convertToTransparentImage()
	{
		for(int row=0; row<height; row++)
			
			for(int col=0; col<width; col++)
				imageData[row][col] = ( this.getPixel(row, col) ).toTransparentPixel();
		
	}
	
	
	/**
	 * Modifie la longueur et la largeur de l'image 
	 * @param w : nouvelle largeur
	 * @param h : nouvelle hauteur
	 */
	public void resize(int w, int h) throws IllegalArgumentException
	{
		if(w < 0 || h < 0)
			throw new IllegalArgumentException();
		
		AbstractPixel[][] temp = new AbstractPixel[h][w];
		
		boolean estAgrandissement= (h<=height) ? false : true;
		
		for(int i = 0; i < h; ++i)
		{
			// Calculate various indexes used later (i.e. closest known pixels in the original image)
			double indexHOriginalImage = (double) i / (h) * (imageData.length);
			
			int closestMinHOriginalImage = (int) Math.floor(indexHOriginalImage);
			int closestMaxHOriginalImage = (int) Math.ceil(indexHOriginalImage);
			
			double closestMinHNewImage = (double)closestMinHOriginalImage / (imageData.length) * (h);
			double closestMaxHNewImage = (double)closestMaxHOriginalImage / (imageData.length) * (h);
			
			for(int j = 0; j < w; ++j)
			{
				double indexWOriginalImage = (double) j / (w) * (imageData[0].length);
				
				int closestMinWOriginalImage = (int) Math.floor(indexWOriginalImage);
				int closestMaxWOriginalImage = (int) Math.ceil(indexWOriginalImage);
				
				
				// Early bail-out if a pixel in the original image corresponds exactly to one in the new image
				// Includes correction for rounding errors
				if(Math.abs(closestMinHOriginalImage - closestMaxHOriginalImage) < 0.000000001 &&
						Math.abs(closestMinWOriginalImage - closestMaxWOriginalImage) < 0.000000001)
				{
					temp[i][j] = imageData[closestMaxHOriginalImage][closestMaxWOriginalImage].toTransparentPixel();
					continue;
				}
				
				double closestMinWNewImage = (double)closestMinWOriginalImage / (imageData[0].length) * (w);
				double closestMaxWNewImage = (double)closestMaxWOriginalImage / (imageData[0].length) * (w);
				
				// Correction factor to prevent rounding errors
				double factor = (estAgrandissement ? 2.5 : 2);
				
				double diagonale2NewImage = factor * Math.sqrt(Math.pow(closestMaxWNewImage - closestMinWNewImage, 2) +
						Math.pow(closestMaxHNewImage - closestMinHNewImage, 2));

				// Prevent division errors if == 0
				diagonale2NewImage = (diagonale2NewImage == 0 ? 1 : diagonale2NewImage);

				double distanceMinWMinH = Math.sqrt(Math.pow(j - closestMinWNewImage, 2) + Math.pow(i - closestMinHNewImage, 2));
				double distanceMaxWMinH = Math.sqrt(Math.pow(closestMaxWNewImage - j, 2) + Math.pow(i - closestMinHNewImage, 2));
				double distanceMinWMaxH = Math.sqrt(Math.pow(j - closestMinWNewImage, 2) + Math.pow(closestMaxHNewImage - i, 2));
				double distanceMaxWMaxH = Math.sqrt(Math.pow(closestMaxWNewImage - j, 2) + Math.pow(closestMaxHNewImage - i, 2));
				
				int[] pixelColor = new int[4];
				
				// Correction for different edge cases, i.e. the last row/column
				closestMaxHOriginalImage = (closestMaxHOriginalImage >= imageData.length ? imageData.length - 1 : closestMaxHOriginalImage);
				closestMaxWOriginalImage = (closestMaxWOriginalImage >= imageData[0].length ? imageData[0].length - 1 : closestMaxWOriginalImage);

				for(int k = 0; k < 4; ++k)
				{
					double newColor = ((double)imageData[closestMinHOriginalImage][closestMinWOriginalImage].toTransparentPixel().rgba[k] * distanceMinWMinH / diagonale2NewImage + 
							(double)imageData[closestMinHOriginalImage][closestMaxWOriginalImage].toTransparentPixel().rgba[k] * distanceMaxWMinH / diagonale2NewImage +
							(double)imageData[closestMaxHOriginalImage][closestMinWOriginalImage].toTransparentPixel().rgba[k] * distanceMinWMaxH / diagonale2NewImage +
							(double)imageData[closestMaxHOriginalImage][closestMaxWOriginalImage].toTransparentPixel().rgba[k] * distanceMaxWMaxH / diagonale2NewImage);
				
					pixelColor[k] = (int) Math.round(newColor);
				}
				
				temp[i][j] = new TransparentPixel(pixelColor);
			}
		}
	    
	    height = h;
	    width = w;
	    imageData = temp;

	}
	
	/**
	 * Insert pm dans l'image a la position row0 col0
	 */
	public void insert(PixelMap pm, int row0, int col0)
	{
		for(int i=0; i<pm.height;i++)
		{
			for(int j=0; j<pm.width;j++)
			{
				if(!(i+row0>=height || j+col0>=width))
					
					imageData[i+row0][j+col0]=pm.getPixel(i,j);
			}
		}
		
	}
	
	/**
	 * Decoupe l'image 
	 */
	public void crop(int h, int w)
	{
		if(w < 0 || h < 0)
			throw new IllegalArgumentException();
		
		AbstractPixel[][]temp=new AbstractPixel[h][w];
		
		for(int i=0 ; i<h ; i++)
		{
			for(int j=0 ; j<w ; j++)
			{
				if( j < width && i < height)
					
					temp[i][j]=imageData[i][j];
				else 
					
					temp[i][j]=new BWPixel(true);
			}
		}
		
		height=h;
		width=w;
		imageData=temp;		
		
	}
	
	/**
	 * Effectue une translation de l'image 
	 */
	public void translate(int rowOffset, int colOffset)
	{
		AbstractPixel[][]temp=new AbstractPixel[height][width];	
		
	for(int i=0;i<height;i++)
	{
		for(int j=0;j<width;j++)
		{
			if((i+rowOffset>=0 && i<height) && (j+colOffset>=0 && j<width))
				
				temp[i+rowOffset][j+colOffset]=imageData[i][j];
		
			else
				
				temp[i][j]=new BWPixel(true);
		}
	}
	
	imageData=temp;
		
	}		
	
	
	}
	
