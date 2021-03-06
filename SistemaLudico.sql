USE [master]
GO
/****** Object:  Database [BDSistemaLudico]    Script Date: 6/25/2020 2:16:21 PM ******/
CREATE DATABASE [BDSistemaLudico]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'BDSistemaLudico', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\BDSistemaLudico.mdf' , SIZE = 4096KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'BDSistemaLudico_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\BDSistemaLudico_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [BDSistemaLudico] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [BDSistemaLudico].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [BDSistemaLudico] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [BDSistemaLudico] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [BDSistemaLudico] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [BDSistemaLudico] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [BDSistemaLudico] SET ARITHABORT OFF 
GO
ALTER DATABASE [BDSistemaLudico] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [BDSistemaLudico] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [BDSistemaLudico] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [BDSistemaLudico] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [BDSistemaLudico] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [BDSistemaLudico] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [BDSistemaLudico] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [BDSistemaLudico] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [BDSistemaLudico] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [BDSistemaLudico] SET  DISABLE_BROKER 
GO
ALTER DATABASE [BDSistemaLudico] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [BDSistemaLudico] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [BDSistemaLudico] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [BDSistemaLudico] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [BDSistemaLudico] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [BDSistemaLudico] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [BDSistemaLudico] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [BDSistemaLudico] SET RECOVERY FULL 
GO
ALTER DATABASE [BDSistemaLudico] SET  MULTI_USER 
GO
ALTER DATABASE [BDSistemaLudico] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [BDSistemaLudico] SET DB_CHAINING OFF 
GO
ALTER DATABASE [BDSistemaLudico] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [BDSistemaLudico] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [BDSistemaLudico] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'BDSistemaLudico', N'ON'
GO
USE [BDSistemaLudico]
GO
/****** Object:  Table [dbo].[Administrador]    Script Date: 6/25/2020 2:16:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Administrador](
	[AdministradorId] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](500) NOT NULL,
	[Apellido] [varchar](500) NOT NULL,
	[FechaCreacion] [datetime] NOT NULL,
	[Estado] [varchar](3) NOT NULL,
	[Usuario] [varchar](50) NOT NULL,
	[Contrasenia] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Administrador] PRIMARY KEY CLUSTERED 
(
	[AdministradorId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Calificacion]    Script Date: 6/25/2020 2:16:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Calificacion](
	[CalificacionId] [int] IDENTITY(1,1) NOT NULL,
	[Nota] [decimal](18, 2) NOT NULL,
	[CursoId] [int] NOT NULL,
	[TipoJuegoId] [int] NOT NULL,
 CONSTRAINT [PK_Calificacion] PRIMARY KEY CLUSTERED 
(
	[CalificacionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Curso]    Script Date: 6/25/2020 2:16:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Curso](
	[CursoId] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](500) NOT NULL,
	[RutaPdf] [varchar](500) NOT NULL,
	[RutaAudio] [varchar](500) NOT NULL,
	[RutaWord] [varchar](500) NOT NULL,
	[FechaCreacion] [datetime] NOT NULL,
	[Estado] [varchar](3) NOT NULL,
	[AdministradorEdicionId] [int] NULL,
 CONSTRAINT [PK_Curso] PRIMARY KEY CLUSTERED 
(
	[CursoId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Ejercicio]    Script Date: 6/25/2020 2:16:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Ejercicio](
	[EjercicioId] [int] IDENTITY(1,1) NOT NULL,
	[Valor1] [int] NOT NULL,
	[Valor2] [int] NOT NULL,
	[Resultado] [int] NOT NULL,
	[RutaImagen] [varchar](500) NOT NULL,
	[TipoJuegoId] [int] NOT NULL,
	[TemaId] [int] NOT NULL,
	[Estado] [varchar](3) NOT NULL,
	[Orden] [int] NULL,
 CONSTRAINT [PK_Ejercicio] PRIMARY KEY CLUSTERED 
(
	[EjercicioId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Participante]    Script Date: 6/25/2020 2:16:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Participante](
	[ParticipanteId] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](500) NOT NULL,
	[Apellido] [varchar](500) NOT NULL,
	[Codigo] [varchar](500) NOT NULL,
	[FechaCreacion] [datetime] NOT NULL,
	[Estado] [varchar](3) NOT NULL,
 CONSTRAINT [PK_Participante] PRIMARY KEY CLUSTERED 
(
	[ParticipanteId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Progreso]    Script Date: 6/25/2020 2:16:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Progreso](
	[ProgresoId] [int] IDENTITY(1,1) NOT NULL,
	[ParticipanteId] [int] NOT NULL,
	[TemaId] [int] NOT NULL,
	[EstadoProgreso] [varchar](3) NULL,
	[EjercicioId] [int] NULL,
 CONSTRAINT [PK_Progreso] PRIMARY KEY CLUSTERED 
(
	[ProgresoId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Tema]    Script Date: 6/25/2020 2:16:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Tema](
	[TemaId] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](500) NOT NULL,
	[RutaWord] [varchar](500) NOT NULL,
	[RutaPdf] [varchar](500) NOT NULL,
	[RutaAudio] [varchar](500) NOT NULL,
	[RutaPpt] [varchar](500) NOT NULL,
	[FechaCreación] [datetime] NOT NULL,
	[Estado] [varchar](3) NOT NULL,
	[CursoId] [int] NULL,
	[AdministradorEdicionId] [int] NULL,
 CONSTRAINT [PK_Tema] PRIMARY KEY CLUSTERED 
(
	[TemaId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[TipoJuego]    Script Date: 6/25/2020 2:16:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[TipoJuego](
	[TipoJuegoId] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
	[Estado] [varchar](3) NOT NULL,
	[TemaId] [int] NOT NULL,
	[Orden] [int] NOT NULL,
	[Nivel] [varchar](3) NULL,
 CONSTRAINT [PK_TipoJuego] PRIMARY KEY CLUSTERED 
(
	[TipoJuegoId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
ALTER TABLE [dbo].[Calificacion]  WITH CHECK ADD  CONSTRAINT [FK_Calificacion_Curso] FOREIGN KEY([CursoId])
REFERENCES [dbo].[Curso] ([CursoId])
GO
ALTER TABLE [dbo].[Calificacion] CHECK CONSTRAINT [FK_Calificacion_Curso]
GO
ALTER TABLE [dbo].[Calificacion]  WITH CHECK ADD  CONSTRAINT [FK_Calificacion_TipoJuego] FOREIGN KEY([TipoJuegoId])
REFERENCES [dbo].[TipoJuego] ([TipoJuegoId])
GO
ALTER TABLE [dbo].[Calificacion] CHECK CONSTRAINT [FK_Calificacion_TipoJuego]
GO
ALTER TABLE [dbo].[Curso]  WITH CHECK ADD  CONSTRAINT [FK_Curso_Administrador] FOREIGN KEY([AdministradorEdicionId])
REFERENCES [dbo].[Administrador] ([AdministradorId])
GO
ALTER TABLE [dbo].[Curso] CHECK CONSTRAINT [FK_Curso_Administrador]
GO
ALTER TABLE [dbo].[Ejercicio]  WITH CHECK ADD  CONSTRAINT [FK_Ejercicio_Tema] FOREIGN KEY([TemaId])
REFERENCES [dbo].[Tema] ([TemaId])
GO
ALTER TABLE [dbo].[Ejercicio] CHECK CONSTRAINT [FK_Ejercicio_Tema]
GO
ALTER TABLE [dbo].[Ejercicio]  WITH CHECK ADD  CONSTRAINT [FK_Ejercicio_TipoJuego] FOREIGN KEY([TipoJuegoId])
REFERENCES [dbo].[TipoJuego] ([TipoJuegoId])
GO
ALTER TABLE [dbo].[Ejercicio] CHECK CONSTRAINT [FK_Ejercicio_TipoJuego]
GO
ALTER TABLE [dbo].[Progreso]  WITH CHECK ADD  CONSTRAINT [FK_Progreso_Ejercicio] FOREIGN KEY([EjercicioId])
REFERENCES [dbo].[Ejercicio] ([EjercicioId])
GO
ALTER TABLE [dbo].[Progreso] CHECK CONSTRAINT [FK_Progreso_Ejercicio]
GO
ALTER TABLE [dbo].[Progreso]  WITH CHECK ADD  CONSTRAINT [FK_Progreso_Participante] FOREIGN KEY([ParticipanteId])
REFERENCES [dbo].[Participante] ([ParticipanteId])
GO
ALTER TABLE [dbo].[Progreso] CHECK CONSTRAINT [FK_Progreso_Participante]
GO
ALTER TABLE [dbo].[Progreso]  WITH CHECK ADD  CONSTRAINT [FK_Progreso_Tema] FOREIGN KEY([TemaId])
REFERENCES [dbo].[Tema] ([TemaId])
GO
ALTER TABLE [dbo].[Progreso] CHECK CONSTRAINT [FK_Progreso_Tema]
GO
ALTER TABLE [dbo].[Tema]  WITH CHECK ADD  CONSTRAINT [FK_Tema_Administrador] FOREIGN KEY([AdministradorEdicionId])
REFERENCES [dbo].[Administrador] ([AdministradorId])
GO
ALTER TABLE [dbo].[Tema] CHECK CONSTRAINT [FK_Tema_Administrador]
GO
ALTER TABLE [dbo].[Tema]  WITH CHECK ADD  CONSTRAINT [FK_Tema_Curso] FOREIGN KEY([CursoId])
REFERENCES [dbo].[Curso] ([CursoId])
GO
ALTER TABLE [dbo].[Tema] CHECK CONSTRAINT [FK_Tema_Curso]
GO
ALTER TABLE [dbo].[TipoJuego]  WITH CHECK ADD  CONSTRAINT [FK_TipoJuego_Tema] FOREIGN KEY([TemaId])
REFERENCES [dbo].[Tema] ([TemaId])
GO
ALTER TABLE [dbo].[TipoJuego] CHECK CONSTRAINT [FK_TipoJuego_Tema]
GO
USE [master]
GO
ALTER DATABASE [BDSistemaLudico] SET  READ_WRITE 
GO
